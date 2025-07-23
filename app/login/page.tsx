import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4">
      <Suspense fallback={<div className="text-center">Loading login form...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}