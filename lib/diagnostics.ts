// lib/diagnostics.ts
import { createServerClient } from "@/lib/supabase-server"
import { type Database } from "@/types/supabase"
import { z } from "zod"

export type DiagnosticStatus = "pass" | "fail" | "warning" | "running" | "unknown"
export type SupabaseLogStatus = "pass" | "fail" | "warning"

export interface DiagnosticTest {
  id: string
  name: string
  run: () => Promise<{
    status: DiagnosticStatus
    message: string
    meta?: Record<string, any>
  }>
  critical?: boolean
}

export interface DiagnosticResult {
  id: string
  name: string
  status: DiagnosticStatus
  message: string
  meta?: Record<string, any>
}

function normalizeToSupabaseStatus(status: DiagnosticStatus): SupabaseLogStatus {
  return ["pass", "fail", "warning"].includes(status) ? status as SupabaseLogStatus : "fail"
}

export async function logDiagnostic(result: {
  test_name: string
  run_status: SupabaseLogStatus
  logs: {
    id: string
    message: string
    meta?: Record<string, any>
  }
}) {
  const supabase = createServerClient()
  await supabase.from("diagnostic_logs").insert({
    test_name: result.test_name,
    run_status: result.run_status,
    message: result.logs.message,
    meta: result.logs.meta ?? {},
    run_id: result.logs.id,
  })
}

export async function runDiagnostics(tests: DiagnosticTest[]): Promise<DiagnosticResult[]> {
  const results: DiagnosticResult[] = []

  for (const test of tests) {
    try {
      const { status, message, meta } = await test.run()
      const result: DiagnosticResult = { id: test.id, name: test.name, status, message, meta }
      results.push(result)

      await logDiagnostic({
        test_name: test.name,
        run_status: normalizeToSupabaseStatus(status),
        logs: { id: test.id, message, meta },
      })
    } catch (err) {
      const failResult: DiagnosticResult = {
        id: test.id,
        name: test.name,
        status: "fail",
        message: (err as Error)?.message || "Unknown error",
      }
      results.push(failResult)

      await logDiagnostic({
        test_name: test.name,
        run_status: "fail",
        logs: { id: test.id, message: failResult.message },
      })
    }
  }

  return results
}
