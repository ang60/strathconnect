"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    setIsLoading(true);
    // Placeholder for password reset
    setTimeout(() => {
      toast.success("Password reset email sent! Check your inbox.");
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Link 
            href="/auth/login" 
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sign In
          </Link>

          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center space-y-1">
              <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-xl">Check your email</CardTitle>
              <CardDescription>
                We've sent a password reset link to <strong>{email}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Didn't receive the email? Check your spam folder or try again with a different email address.
              </p>
              
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsSubmitted(false)}
                >
                  Try another email
                </Button>
                <Link href="/auth/login">
                  <Button variant="ghost" className="w-full">
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link 
          href="/auth/login" 
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sign In
        </Link>

        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              StrathConnect
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Forgot your password?
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Reset Password</CardTitle>
            <CardDescription className="text-center">
              Enter your email address and we'll send you a link to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Remember your password?{" "}
              </span>
              <Link
                href="/auth/login"
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
