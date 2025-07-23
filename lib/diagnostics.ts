import { createClient } from "@/lib/supabase/server"
import { Database } from "@/types/supabase"
import { z } from "zod"

// Define status types for UI and Supabase logging
export type DiagnosticStatus = "pass" | "fail" | "warning" | "running" | "unknown"
export type SupabaseLogStatus = "pass" | "fail" | "warning"

// Diagnostic test structure
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

// For visual UI status badge rendering
export function getOverallStatus(tests: DiagnosticResult[]): DiagnosticStatus {
  if (tests.some((t) => t.status === "fail")) return "fail"
  if (tests.some((t) => t.status === "warning")) return "warning"
  if (tests.some((t) => t.status === "running")) return "running"
  if (tests.every((t) => t.status === "pass")) return "pass"
  return "unknown"
}

// Result after a test run
export interface DiagnosticResult {
  id: string
  name: string
  status: DiagnosticStatus
  message: string
  meta?: Record<string, any>
}

// Convert frontend UI status to a Supabase-safe loggable status
function normalizeToSupabaseStatus(status: DiagnosticStatus): SupabaseLogStatus {
  return status === "warning" || status === "pass" || status === "fail" ? status : "fail"
}

// Log diagnostic result to Supabase
export async function logDiagnostic(result: {
  test_name: string
  run_status: SupabaseLogStatus
  logs: {
    id: string
    message: string
    meta?: Record<string, any>
  }
}) {
  const supabase = createClient()
  await supabase.from("diagnostic_logs").insert({
    test_name: result.test_name,
    run_status: result.run_status,
    message: result.logs.message,
    meta: result.logs.meta ?? {},
    run_id: result.logs.id,
  })
}

// Master runner function
export async function runDiagnostics(tests: DiagnosticTest[]): Promise<DiagnosticResult[]> {
  const results: DiagnosticResult[] = []

  for (const test of tests) {
    try {
      const { status, message, meta } = await test.run()

      const result: DiagnosticResult = {
        id: test.id,
        name: test.name,
        status,
        message,
        meta,
      }

      results.push(result)

      // Log to Supabase
      await logDiagnostic({
        test_name: test.name,
        run_status: normalizeToSupabaseStatus(status),
        logs: {
          id: test.id,
          message,
          meta,
        },
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
        logs: {
          id: test.id,
          message: failResult.message,
        },
      })
    }
  }

  return results
}
