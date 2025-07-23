
"use client"

import SupabaseDiagnostics from "@/components/supabase-diagnostics"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export default function DiagnosticsDebugPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        {/* Debug Notice */}
        <Card className="mb-6 border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
              <div>
                <h3 className="font-medium text-orange-800">Debug Diagnostics Dashboard</h3>
                <p className="text-sm text-orange-600">
                  No authentication required • For development and debugging
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Diagnostics Component */}
        <SupabaseDiagnostics />
      </div>
    </div>
  )
}
