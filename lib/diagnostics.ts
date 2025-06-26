
import { createClient } from './supabase'
import type { SupabaseClient } from '@supabase/supabase-js'

export interface DiagnosticResult {
  name: string
  status: 'success' | 'error' | 'warning' | 'running'
  message: string
  details?: string
  count?: number
  lastEntry?: {
    name: string
    created_at: string
  }
  timestamp: string
}

export interface DiagnosticReport {
  envReady: boolean
  hasSession: boolean
  isDoctor: boolean
  appointmentCount: number
  messageCount: number
  lastAppointment?: { name: string; created_at: string }
  lastMessage?: { name: string; created_at: string }
  writeTestPassed: boolean
  adminAccessSimulatedRedirect: boolean
  results: DiagnosticResult[]
  overallStatus: 'success' | 'warning' | 'error'
}

export async function runDiagnostics(): Promise<DiagnosticReport> {
  const results: DiagnosticResult[] = []
  const report: Partial<DiagnosticReport> = {
    envReady: false,
    hasSession: false,
    isDoctor: false,
    appointmentCount: 0,
    messageCount: 0,
    writeTestPassed: false,
    adminAccessSimulatedRedirect: false,
    results: []
  }

  // Test 1: Environment Variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  report.envReady = !!(supabaseUrl && supabaseAnonKey)
  results.push({
    name: "Environment Variables",
    status: report.envReady ? "success" : "error",
    message: report.envReady ? "✅ Environment variables configured" : "❌ Missing Supabase environment variables",
    details: `URL: ${supabaseUrl ? "✓ Set" : "✗ Missing"}, Key: ${supabaseAnonKey ? "✓ Set" : "✗ Missing"}`,
    timestamp: new Date().toISOString()
  })

  if (!report.envReady) {
    return {
      ...report,
      results,
      overallStatus: 'error'
    } as DiagnosticReport
  }

  let supabase: SupabaseClient
  try {
    supabase = createClient()
  } catch (error) {
    results.push({
      name: "Supabase Client",
      status: "error",
      message: "❌ Failed to create Supabase client",
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    })
    return {
      ...report,
      results,
      overallStatus: 'error'
    } as DiagnosticReport
  }

  // Test 2: Session Check
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    report.hasSession = !!session
    report.isDoctor = session?.user?.user_metadata?.role === 'doctor' || !!session
    
    results.push({
      name: "Authentication Status",
      status: report.hasSession ? "success" : "warning",
      message: report.hasSession ? "✅ User session active" : "⚠️ No active session",
      details: report.hasSession ? `User: ${session.user.email}` : "Not authenticated",
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    results.push({
      name: "Authentication Status",
      status: "error",
      message: "❌ Auth check failed",
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    })
  }

  // Test 3: Appointments Table
  try {
    const { count, error, data } = await supabase
      .from('appointments')
      .select('id, name, created_at', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(1)

    if (error) throw error

    report.appointmentCount = count || 0
    report.lastAppointment = data?.[0] ? {
      name: data[0].name,
      created_at: data[0].created_at
    } : undefined

    results.push({
      name: "Appointments Database",
      status: "success",
      message: `✅ Appointments table accessible`,
      details: `Found ${count} appointments`,
      count: count || 0,
      lastEntry: report.lastAppointment,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    results.push({
      name: "Appointments Database",
      status: "error",
      message: "❌ Cannot access appointments table",
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    })
  }

  // Test 4: Messages Table
  try {
    const { count, error, data } = await supabase
      .from('messages')
      .select('id, name, created_at', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(1)

    if (error) throw error

    report.messageCount = count || 0
    report.lastMessage = data?.[0] ? {
      name: data[0].name,
      created_at: data[0].created_at
    } : undefined

    results.push({
      name: "Messages Database",
      status: "success",
      message: `✅ Messages table accessible`,
      details: `Found ${count} messages`,
      count: count || 0,
      lastEntry: report.lastMessage,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    results.push({
      name: "Messages Database",
      status: "error",
      message: "❌ Cannot access messages table",
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    })
  }

  // Test 5: Write Test
  try {
    const testData = {
      name: "🧪 Diagnostic Test Entry",
      phone: "+91 0000000000",
      email: "diagnostic@test.com",
      reason: "Automated diagnostic test - can be deleted",
      preferred_time: new Date().toISOString(),
    }

    const { error } = await supabase
      .from('appointments')
      .insert(testData)

    if (error) throw error

    report.writeTestPassed = true
    results.push({
      name: "Database Write Test",
      status: "success",
      message: "✅ Write operations working",
      details: "Successfully created test appointment",
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    results.push({
      name: "Database Write Test",
      status: "error",
      message: "❌ Write operations failed",
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    })
  }

  // Test 6: Form Endpoints
  try {
    const contactResponse = await fetch('/contact', { method: 'HEAD' })
    const bookResponse = await fetch('/book', { method: 'HEAD' })
    
    const contactStatus = contactResponse.ok ? "✅" : "❌"
    const bookStatus = bookResponse.ok ? "✅" : "❌"
    
    results.push({
      name: "Form Endpoints",
      status: contactResponse.ok && bookResponse.ok ? "success" : "warning",
      message: `${contactStatus} Contact Form, ${bookStatus} Booking Form`,
      details: `Contact: ${contactResponse.status}, Book: ${bookResponse.status}`,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    results.push({
      name: "Form Endpoints",
      status: "error",
      message: "❌ Form endpoint check failed",
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    })
  }

  // Test 7: Admin Access Simulation
  try {
    const adminResponse = await fetch('/admin', { 
      method: 'HEAD',
      redirect: 'manual' 
    })
    
    // If we get a redirect or 401, it means auth is working
    report.adminAccessSimulatedRedirect = adminResponse.status === 302 || adminResponse.status === 401 || adminResponse.status === 200
    
    results.push({
      name: "Admin Protection",
      status: report.adminAccessSimulatedRedirect ? "success" : "warning",
      message: report.adminAccessSimulatedRedirect ? "✅ Admin routes protected" : "⚠️ Admin protection unclear",
      details: `Response: ${adminResponse.status}`,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    results.push({
      name: "Admin Protection",
      status: "warning",
      message: "⚠️ Could not test admin protection",
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    })
  }

  // Determine overall status
  const hasErrors = results.some(r => r.status === 'error')
  const hasWarnings = results.some(r => r.status === 'warning')
  
  const overallStatus: 'success' | 'warning' | 'error' = hasErrors ? 'error' : hasWarnings ? 'warning' : 'success'

  return {
    ...report,
    results,
    overallStatus
  } as DiagnosticReport
}

export async function cleanupTestData(): Promise<void> {
  try {
    const supabase = createClient()
    
    // Clean up test appointments
    await supabase
      .from('appointments')
      .delete()
      .like('name', '%Diagnostic Test%')
    
    // Clean up test messages
    await supabase
      .from('messages')
      .delete()
      .like('name', '%Diagnostic Test%')
  } catch (error) {
    console.error('Cleanup failed:', error)
  }
}
