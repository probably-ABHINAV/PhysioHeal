"use client"

import { useState } from "react"
import { SupabaseDiagnostics } from "@/components/supabase-diagnostics"

export default function DiagnosticsPage() {
  const [hasAccess, setHasAccess] = useState(false)
  const [password, setPassword] = useState("")

  const handleAccess = () => {
    // Simple password check (you can change this)
    if (password === "admin123" || password === "diagnostics") {
      setHasAccess(true)
    } else {
      alert("Invalid access code")
    }
  }

  if (!hasAccess) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="max-w-md w-full p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">System Access</h1>
          <input
            type="password"
            placeholder="Enter access code"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAccess()}
            className="w-full p-3 border rounded-lg mb-4"
          />
          <button onClick={handleAccess} className="w-full bg-primary text-white p-3 rounded-lg hover:bg-primary/90">
            Access Diagnostics
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <SupabaseDiagnostics />
    </div>
  )
}
