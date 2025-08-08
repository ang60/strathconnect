"use client";

import { useState } from "react";
import { apiService } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestConnectionPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const health = await apiService.healthCheck();
      setResult(health);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>API Connection Test</CardTitle>
          <CardDescription>
            Test the connection to the backend API
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={testConnection} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Testing..." : "Test Connection"}
          </Button>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <h3 className="font-medium text-red-800">Error:</h3>
              <p className="text-red-600 mt-1">{error}</p>
            </div>
          )}

          {result && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <h3 className="font-medium text-green-800">Success:</h3>
              <pre className="text-green-600 mt-1 text-sm overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}

          <div className="text-sm text-gray-600">
            <p><strong>API URL:</strong> {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}</p>
            <p><strong>Expected Backend Port:</strong> 3000</p>
            <p><strong>Expected Frontend Port:</strong> 3000</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
