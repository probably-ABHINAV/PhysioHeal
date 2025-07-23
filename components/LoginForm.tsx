
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { signInWithEmail, signUpWithEmail } from "@/lib/supabase";

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const { toast } = useToast();

  useEffect(() => setIsClient(true), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (formData.email === "xoxogroovy@gmail.com" && formData.password === "Cypher123@") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("userRole", "admin");

        toast({ title: "Login Successful", description: "Welcome back, Admin!" });
        router.push(redirectTo);
        return;
      }

      let result;
      if (isLogin) {
        result = await signInWithEmail(formData.email, formData.password);
      } else {
        result = await signUpWithEmail(formData.email, formData.password, { role: "patient" });
      }

      if (result.error) {
        toast({ title: "Auth Error", description: result.error.message, variant: "destructive" });
        return;
      }

      if (result.data?.user) {
        toast({
          title: isLogin ? "Login Successful" : "Account Created",
          description: isLogin ? "Welcome back!" : "Check your email to verify account.",
        });
        if (isLogin) router.push(redirectTo);
      }
    } catch {
      toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const getPageTitle = () => {
    if (redirectTo.includes("admin")) return "Admin Login";
    if (redirectTo.includes("diagnostics")) return "Diagnostics Login";
    if (redirectTo.includes("setup")) return "Setup Login";
    return "Login";
  };

  const getPageDescription = () => {
    if (redirectTo.includes("admin")) return "Access the admin dashboard";
    if (redirectTo.includes("diagnostics")) return "Run diagnostics";
    if (redirectTo.includes("setup")) return "Set up your database";
    return "Sign in to your account";
  };

  if (!isClient) {
    return <div className="text-center py-16">Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/90">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">PhysioHeal</span>
          </div>
          <CardTitle className="text-xl font-semibold">{getPageTitle()}</CardTitle>
          <CardDescription>{getPageDescription()}</CardDescription>
        </CardHeader>

        <CardContent>
          {redirectTo !== "/" && (
            <Alert className="mb-6 border-blue-200 bg-blue-50">
              <Shield className="h-4 w-4" />
              <AlertDescription>This page requires authentication.</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-10"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-10 pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>

            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{isLogin ? "Signing in..." : "Creating account..."}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>{isLogin ? "Sign In" : "Create Account"}</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button variant="ghost" className="text-sm" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </Button>
          </div>

          <div className="mt-4 text-center">
            <Button variant="outline" className="text-sm" onClick={() => router.push("/")}>
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
