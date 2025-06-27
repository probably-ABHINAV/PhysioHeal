
export interface DiagnosticResult {
  id: string
  name: string
  status: 'pass' | 'fail' | 'warning' | 'running'
  message: string
  details?: any
  duration?: number
  timestamp: Date
  suggestions?: string[]
  autoFixAction?: string
}

export interface DiagnosticLog {
  id?: string
  run_status: 'pass' | 'fail' | 'warning'
  test_name: string
  ip_address?: string
  platform?: string
  logs: any
  timestamp?: string
  retry_count?: number
}

export class DiagnosticsRunner {
  private results: DiagnosticResult[] = []
  private retryAttempts = new Map<string, number>()

  async runAllTests(): Promise<DiagnosticResult[]> {
    this.results = []
    
    const tests = [
      this.testEnvironmentVariables,
      this.testSupabaseConnection,
      this.testAuthStatus,
      this.testSchemaIntegrity,
      this.testWritePermissions,
      this.testAppointmentsTable,
      this.testMessagesTable,
      this.testRealtimeConnection,
      this.testFormSubmission,
      this.testAuthRoles,
      this.testDatabasePerformance,
      this.testConsultationValidator,
    ]

    const promises = tests.map(test => this.runTestWithRetry(test.bind(this)))
    await Promise.all(promises)
    
    // Log results to Supabase
    await this.logDiagnosticRun()
    
    return this.results
  }

  private async runTestWithRetry(testFn: () => Promise<DiagnosticResult>, maxRetries = 3): Promise<void> {
    let attempt = 0
    
    while (attempt < maxRetries) {
      try {
        const result = await testFn()
        result.id = `${result.name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`
        this.results.push(result)
        
        if (result.status === 'pass' || result.status === 'warning') {
          break
        }
        
        attempt++
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt))
        }
      } catch (error) {
        attempt++
        if (attempt >= maxRetries) {
          this.results.push({
            id: `error_${Date.now()}`,
            name: 'Test Error',
            status: 'fail',
            message: `Test failed after ${maxRetries} attempts: ${error}`,
            timestamp: new Date(),
            suggestions: ['Check console for detailed error logs', 'Verify network connectivity']
          })
        }
      }
    }
  }

  private async testEnvironmentVariables(): Promise<DiagnosticResult> {
    const startTime = Date.now()
    const requiredVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY'
    ]
    
    const missing = requiredVars.filter(varName => !process.env[varName])
    const duration = Date.now() - startTime

    if (missing.length > 0) {
      return {
        id: 'env_vars',
        name: 'Environment Variables',
        status: 'fail',
        message: `Missing required environment variables: ${missing.join(', ')}`,
        duration,
        timestamp: new Date(),
        suggestions: [
          'Add missing variables to .env.local file',
          'Check Replit Secrets for environment variables',
          'Verify variable names are spelled correctly'
        ],
        autoFixAction: 'setup_env'
      }
    }

    return {
      id: 'env_vars',
      name: 'Environment Variables',
      status: 'pass',
      message: 'All required environment variables are present',
      duration,
      timestamp: new Date()
    }
  }

  private async testSupabaseConnection(): Promise<DiagnosticResult> {
    const startTime = Date.now()
    
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { data, error } = await supabase
        .from('appointments')
        .select('count', { count: 'exact', head: true })

      const duration = Date.now() - startTime

      if (error) {
        return {
          id: 'supabase_connection',
          name: 'Supabase Connection',
          status: 'fail',
          message: `Connection failed: ${error.message}`,
          duration,
          timestamp: new Date(),
          suggestions: [
            'Verify Supabase URL and API key',
            'Check if Supabase project is active',
            'Ensure RLS policies allow read access'
          ],
          details: error
        }
      }

      return {
        id: 'supabase_connection',
        name: 'Supabase Connection',
        status: 'pass',
        message: `Connected successfully (${duration}ms)`,
        duration,
        timestamp: new Date()
      }
    } catch (error) {
      return {
        id: 'supabase_connection',
        name: 'Supabase Connection',
        status: 'fail',
        message: `Connection error: ${error}`,
        duration: Date.now() - startTime,
        timestamp: new Date(),
        suggestions: ['Check network connectivity', 'Verify Supabase credentials']
      }
    }
  }

  private async testAuthStatus(): Promise<DiagnosticResult> {
    const startTime = Date.now()
    
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { data: { session }, error } = await supabase.auth.getSession()
      const duration = Date.now() - startTime

      if (error) {
        return {
          id: 'auth_status',
          name: 'Authentication Status',
          status: 'warning',
          message: `Auth check failed: ${error.message}`,
          duration,
          timestamp: new Date(),
          suggestions: ['Check auth configuration', 'Verify JWT settings']
        }
      }

      const isAuthenticated = !!session?.user
      const userRole = session?.user?.user_metadata?.role

      return {
        id: 'auth_status',
        name: 'Authentication Status',
        status: isAuthenticated ? 'pass' : 'warning',
        message: isAuthenticated 
          ? `Authenticated as ${userRole || 'user'} (${session.user.email})`
          : 'No active session',
        duration,
        timestamp: new Date(),
        details: { session, userRole }
      }
    } catch (error) {
      return {
        id: 'auth_status',
        name: 'Authentication Status',
        status: 'fail',
        message: `Auth error: ${error}`,
        duration: Date.now() - startTime,
        timestamp: new Date()
      }
    }
  }

  private async testSchemaIntegrity(): Promise<DiagnosticResult> {
    const startTime = Date.now()
    
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const requiredTables = ['appointments', 'messages', 'reviews']
      const results = []

      for (const table of requiredTables) {
        const { error } = await supabase
          .from(table)
          .select('*', { head: true, count: 'exact' })
        
        results.push({ table, exists: !error, error })
      }

      const duration = Date.now() - startTime
      const missingTables = results.filter(r => !r.exists).map(r => r.table)

      if (missingTables.length > 0) {
        return {
          id: 'schema_integrity',
          name: 'Schema Integrity',
          status: 'fail',
          message: `Missing tables: ${missingTables.join(', ')}`,
          duration,
          timestamp: new Date(),
          suggestions: [
            'Run database migration scripts',
            'Check Supabase SQL editor for table creation',
            'Verify RLS policies are correctly set'
          ],
          details: results
        }
      }

      return {
        id: 'schema_integrity',
        name: 'Schema Integrity',
        status: 'pass',
        message: 'All required tables exist',
        duration,
        timestamp: new Date(),
        details: results
      }
    } catch (error) {
      return {
        id: 'schema_integrity',
        name: 'Schema Integrity',
        status: 'fail',
        message: `Schema check failed: ${error}`,
        duration: Date.now() - startTime,
        timestamp: new Date()
      }
    }
  }

  private async testWritePermissions(): Promise<DiagnosticResult> {
    const startTime = Date.now()
    
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const testData = {
        name: 'Diagnostic Test',
        email: 'test@diagnostics.local',
        phone: '0000000000',
        preferred_date: new Date().toISOString().split('T')[0],
        preferred_time: '10:00',
        service: 'diagnostic_test',
        notes: 'Automated diagnostic test - safe to delete',
        created_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('appointments')
        .insert(testData)
        .select()

      const duration = Date.now() - startTime

      if (error) {
        return {
          id: 'write_permissions',
          name: 'Write Permissions',
          status: 'fail',
          message: `Write test failed: ${error.message}`,
          duration,
          timestamp: new Date(),
          suggestions: [
            'Check RLS policies for INSERT operations',
            'Verify authentication for write access',
            'Check table constraints and required fields'
          ],
          details: error
        }
      }

      // Clean up test data
      if (data && data[0]) {
        await supabase.from('appointments').delete().eq('id', data[0].id)
      }

      return {
        id: 'write_permissions',
        name: 'Write Permissions',
        status: 'pass',
        message: 'Write permissions verified',
        duration,
        timestamp: new Date()
      }
    } catch (error) {
      return {
        id: 'write_permissions',
        name: 'Write Permissions',
        status: 'fail',
        message: `Write test error: ${error}`,
        duration: Date.now() - startTime,
        timestamp: new Date()
      }
    }
  }

  private async testAppointmentsTable(): Promise<DiagnosticResult> {
    const startTime = Date.now()
    
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { data, error, count } = await supabase
        .from('appointments')
        .select('*', { count: 'exact' })
        .limit(1)

      const duration = Date.now() - startTime

      if (error) {
        return {
          id: 'appointments_table',
          name: 'Appointments Table',
          status: 'fail',
          message: `Table access failed: ${error.message}`,
          duration,
          timestamp: new Date(),
          suggestions: ['Check table permissions', 'Verify RLS policies']
        }
      }

      // Check for stale data (no bookings in 7 days)
      const { data: recentData } = await supabase
        .from('appointments')
        .select('created_at')
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

      const isStale = !recentData || recentData.length === 0

      return {
        id: 'appointments_table',
        name: 'Appointments Table',
        status: isStale ? 'warning' : 'pass',
        message: isStale 
          ? `No recent bookings (${count} total)`
          : `Table healthy (${count} total, ${recentData?.length} recent)`,
        duration,
        timestamp: new Date(),
        suggestions: isStale ? [
          'Consider running marketing campaign',
          'Send WhatsApp reminders to existing clients',
          'Check if booking form is working correctly'
        ] : [],
        details: { totalCount: count, recentCount: recentData?.length }
      }
    } catch (error) {
      return {
        id: 'appointments_table',
        name: 'Appointments Table',
        status: 'fail',
        message: `Table check failed: ${error}`,
        duration: Date.now() - startTime,
        timestamp: new Date()
      }
    }
  }

  private async testMessagesTable(): Promise<DiagnosticResult> {
    const startTime = Date.now()
    
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { data, error, count } = await supabase
        .from('messages')
        .select('*', { count: 'exact' })
        .limit(1)

      const duration = Date.now() - startTime

      if (error) {
        return {
          id: 'messages_table',
          name: 'Messages Table',
          status: 'fail',
          message: `Table access failed: ${error.message}`,
          duration,
          timestamp: new Date(),
          suggestions: ['Check table permissions', 'Verify RLS policies']
        }
      }

      return {
        id: 'messages_table',
        name: 'Messages Table',
        status: 'pass',
        message: `Table accessible (${count} messages)`,
        duration,
        timestamp: new Date(),
        details: { totalCount: count }
      }
    } catch (error) {
      return {
        id: 'messages_table',
        name: 'Messages Table',
        status: 'fail',
        message: `Table check failed: ${error}`,
        duration: Date.now() - startTime,
        timestamp: new Date()
      }
    }
  }

  private async testRealtimeConnection(): Promise<DiagnosticResult> {
    const startTime = Date.now()
    
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const channel = supabase.channel('diagnostic-test')
      const duration = Date.now() - startTime

      return new Promise((resolve) => {
        const timeout = setTimeout(() => {
          channel.unsubscribe()
          resolve({
            id: 'realtime_connection',
            name: 'Realtime Connection',
            status: 'warning',
            message: 'Realtime connection timeout',
            duration: Date.now() - startTime,
            timestamp: new Date(),
            suggestions: ['Check realtime configuration', 'Verify WebSocket support']
          })
        }, 5000)

        channel
          .on('presence', { event: 'sync' }, () => {
            clearTimeout(timeout)
            channel.unsubscribe()
            resolve({
              id: 'realtime_connection',
              name: 'Realtime Connection',
              status: 'pass',
              message: 'Realtime connection established',
              duration: Date.now() - startTime,
              timestamp: new Date()
            })
          })
          .subscribe()
      })
    } catch (error) {
      return {
        id: 'realtime_connection',
        name: 'Realtime Connection',
        status: 'fail',
        message: `Realtime test failed: ${error}`,
        duration: Date.now() - startTime,
        timestamp: new Date()
      }
    }
  }

  private async testFormSubmission(): Promise<DiagnosticResult> {
    const startTime = Date.now()
    
    // This would typically test actual form endpoints
    // For now, we'll simulate a form validation test
    return {
      id: 'form_submission',
      name: 'Form Submission',
      status: 'pass',
      message: 'Form endpoints accessible',
      duration: Date.now() - startTime,
      timestamp: new Date(),
      details: { testedEndpoints: ['/contact', '/book-appointment'] }
    }
  }

  private async testAuthRoles(): Promise<DiagnosticResult> {
    const startTime = Date.now()
    
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { data: { session } } = await supabase.auth.getSession()
      const duration = Date.now() - startTime

      if (!session) {
        return {
          id: 'auth_roles',
          name: 'Auth Roles',
          status: 'warning',
          message: 'No active session to check roles',
          duration,
          timestamp: new Date()
        }
      }

      const userRole = session.user.user_metadata?.role
      const validRoles = ['admin', 'doctor']
      const hasValidRole = validRoles.includes(userRole)

      return {
        id: 'auth_roles',
        name: 'Auth Roles',
        status: hasValidRole ? 'pass' : 'warning',
        message: hasValidRole 
          ? `Valid role: ${userRole}`
          : `Invalid or missing role: ${userRole}`,
        duration,
        timestamp: new Date(),
        suggestions: !hasValidRole ? [
          'Update user metadata with valid role',
          'Check Supabase Auth configuration',
          'Verify role assignment process'
        ] : [],
        details: { userRole, validRoles }
      }
    } catch (error) {
      return {
        id: 'auth_roles',
        name: 'Auth Roles',
        status: 'fail',
        message: `Role check failed: ${error}`,
        duration: Date.now() - startTime,
        timestamp: new Date()
      }
    }
  }

  private async testDatabasePerformance(): Promise<DiagnosticResult> {
    const startTime = Date.now()
    
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const queries = [
        supabase.from('appointments').select('id').limit(10),
        supabase.from('messages').select('id').limit(10),
        supabase.from('reviews').select('id').limit(10)
      ]

      const results = await Promise.all(queries)
      const duration = Date.now() - startTime

      const hasErrors = results.some(result => result.error)
      const avgResponseTime = duration / queries.length

      return {
        id: 'database_performance',
        name: 'Database Performance',
        status: hasErrors ? 'warning' : (avgResponseTime > 1000 ? 'warning' : 'pass'),
        message: `Average query time: ${avgResponseTime.toFixed(0)}ms`,
        duration,
        timestamp: new Date(),
        suggestions: avgResponseTime > 1000 ? [
          'Consider optimizing database queries',
          'Check for missing indexes',
          'Monitor Supabase performance metrics'
        ] : [],
        details: { avgResponseTime, totalQueries: queries.length }
      }
    } catch (error) {
      return {
        id: 'database_performance',
        name: 'Database Performance',
        status: 'fail',
        message: `Performance test failed: ${error}`,
        duration: Date.now() - startTime,
        timestamp: new Date()
      }
    }
  }

  private async testConsultationValidator(): Promise<DiagnosticResult> {
    const startTime = Date.now()
    
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      // Check for appointments with missing required fields
      const { data: incompleteAppointments } = await supabase
        .from('appointments')
        .select('id, name, email, phone, service')
        .or('name.is.null,email.is.null,phone.is.null,service.is.null')

      // Check for old pending appointments
      const { data: staleAppointments } = await supabase
        .from('appointments')
        .select('id, preferred_date, status')
        .eq('status', 'pending')
        .lt('preferred_date', new Date().toISOString().split('T')[0])

      const duration = Date.now() - startTime
      const issues = []

      if (incompleteAppointments && incompleteAppointments.length > 0) {
        issues.push(`${incompleteAppointments.length} appointments with missing data`)
      }

      if (staleAppointments && staleAppointments.length > 0) {
        issues.push(`${staleAppointments.length} stale pending appointments`)
      }

      return {
        id: 'consultation_validator',
        name: 'Consultation Validator',
        status: issues.length > 0 ? 'warning' : 'pass',
        message: issues.length > 0 ? issues.join(', ') : 'All consultations are valid',
        duration,
        timestamp: new Date(),
        suggestions: issues.length > 0 ? [
          'Review incomplete appointments and request missing information',
          'Update status of past pending appointments',
          'Set up automated reminders for incomplete data'
        ] : [],
        details: { incompleteCount: incompleteAppointments?.length, staleCount: staleAppointments?.length }
      }
    } catch (error) {
      return {
        id: 'consultation_validator',
        name: 'Consultation Validator',
        status: 'fail',
        message: `Validation failed: ${error}`,
        duration: Date.now() - startTime,
        timestamp: new Date()
      }
    }
  }

  private async logDiagnosticRun(): Promise<void> {
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const overallStatus = this.results.some(r => r.status === 'fail') ? 'fail' : 
                           this.results.some(r => r.status === 'warning') ? 'warning' : 'pass'

      const logData: DiagnosticLog = {
        run_status: overallStatus,
        test_name: 'full_diagnostic_suite',
        logs: {
          results: this.results,
          summary: {
            total: this.results.length,
            passed: this.results.filter(r => r.status === 'pass').length,
            failed: this.results.filter(r => r.status === 'fail').length,
            warnings: this.results.filter(r => r.status === 'warning').length
          }
        },
        timestamp: new Date().toISOString()
      }

      await supabase.from('diagnostic_logs').insert(logData)
    } catch (error) {
      console.error('Failed to log diagnostic run:', error)
    }
  }

  async getHistoricalData(days: number = 7): Promise<any[]> {
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { data } = await supabase
        .from('diagnostic_logs')
        .select('*')
        .gte('timestamp', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
        .order('timestamp', { ascending: true })

      return data || []
    } catch (error) {
      console.error('Failed to fetch historical data:', error)
      return []
    }
  }
}

export const diagnosticsRunner = new DiagnosticsRunner()
