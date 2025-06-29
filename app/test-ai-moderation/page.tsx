
"use client"

import { TestAIModeration } from "@/components/test-ai-moderation"

export default function TestAIModerationPage() {
  return (
    <div className="pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            AI Moderation <span className="gradient-text">Testing</span>
          </h1>
          <p className="text-muted-foreground">
            Test the AI-powered review moderation system
          </p>
        </div>
        
        <TestAIModeration />
      </div>
    </div>
  )
}
