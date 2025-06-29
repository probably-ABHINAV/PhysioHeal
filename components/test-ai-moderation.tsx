
"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  TestTube, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Star,
  Send,
  RefreshCw
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase"

const testReviews = [
  {
    name: "Happy Patient",
    rating: 5,
    comment: "Absolutely wonderful experience! The staff was incredibly professional and caring. Dr. Smith helped me recover from my injury faster than I expected. Highly recommend this clinic to anyone seeking quality physiotherapy.",
    expected: "Positive"
  },
  {
    name: "Satisfied Customer", 
    rating: 4,
    comment: "Good service overall. The treatment was effective and the facilities are clean. Would come back if needed.",
    expected: "Positive"
  },
  {
    name: "Neutral Reviewer",
    rating: 3,
    comment: "The service was okay. Nothing special but got the job done. Average experience.",
    expected: "Neutral"
  },
  {
    name: "Unhappy Patient",
    rating: 2,
    comment: "Very disappointed with the service. The staff was rude and unprofessional. My appointment was delayed by 45 minutes with no explanation. Would not recommend.",
    expected: "Negative"
  },
  {
    name: "Angry Customer",
    rating: 1,
    comment: "Terrible experience! Waste of time and money. The so-called 'doctor' had no idea what they were doing. This place is a scam!",
    expected: "Negative"
  }
]

interface TestResult {
  id: string
  name: string
  comment: string
  expected: string
  actual: string
  approved: boolean
  success: boolean
  error?: string
}

export function TestAIModeration() {
  const [testing, setTesting] = useState(false)
  const [results, setResults] = useState<TestResult[]>([])
  const [customReview, setCustomReview] = useState({
    name: "",
    rating: 5,
    comment: ""
  })
  const [customTesting, setCustomTesting] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()

  const runTests = async () => {
    setTesting(true)
    setResults([])
    
    const testResults: TestResult[] = []
    
    for (const testReview of testReviews) {
      try {
        // Insert review into database
        const { data: insertedReview, error: insertError } = await supabase
          .from('reviews')
          .insert({
            name: testReview.name,
            rating: testReview.rating,
            comment: testReview.comment,
            approved: false
          })
          .select()
          .single()

        if (insertError) {
          throw new Error(`Insert error: ${insertError.message}`)
        }

        // Call AI moderation API
        const moderationResponse = await fetch('/api/moderate-review', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: insertedReview.id,
            review_text: testReview.comment
          }),
        })

        const moderationResult = await moderationResponse.json()

        if (!moderationResult.success) {
          throw new Error(`Moderation error: ${moderationResult.error}`)
        }

        testResults.push({
          id: insertedReview.id,
          name: testReview.name,
          comment: testReview.comment,
          expected: testReview.expected,
          actual: moderationResult.sentiment,
          approved: moderationResult.approved,
          success: true
        })

      } catch (error: any) {
        testResults.push({
          id: `error-${Date.now()}`,
          name: testReview.name,
          comment: testReview.comment,
          expected: testReview.expected,
          actual: "Error",
          approved: false,
          success: false,
          error: error.message
        })
      }
    }

    setResults(testResults)
    setTesting(false)

    const passedTests = testResults.filter(r => r.success && r.expected === r.actual).length
    const totalTests = testResults.length

    toast({
      title: "Test Complete",
      description: `${passedTests}/${totalTests} tests passed`,
      variant: passedTests === totalTests ? "default" : "destructive"
    })
  }

  const testCustomReview = async () => {
    if (!customReview.comment.trim()) {
      toast({
        title: "Error",
        description: "Please enter a review comment to test",
        variant: "destructive"
      })
      return
    }

    setCustomTesting(true)

    try {
      // Insert custom review
      const { data: insertedReview, error: insertError } = await supabase
        .from('reviews')
        .insert({
          name: customReview.name || "Test User",
          rating: customReview.rating,
          comment: customReview.comment,
          approved: false
        })
        .select()
        .single()

      if (insertError) {
        throw new Error(`Insert error: ${insertError.message}`)
      }

      // Call AI moderation
      const moderationResponse = await fetch('/api/moderate-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: insertedReview.id,
          review_text: customReview.comment
        }),
      })

      const moderationResult = await moderationResponse.json()

      if (!moderationResult.success) {
        throw new Error(`Moderation error: ${moderationResult.error}`)
      }

      toast({
        title: "Custom Test Complete",
        description: `Sentiment: ${moderationResult.sentiment}, Approved: ${moderationResult.approved}`,
      })

      // Add to results
      setResults(prev => [...prev, {
        id: insertedReview.id,
        name: customReview.name || "Test User",
        comment: customReview.comment,
        expected: "Custom",
        actual: moderationResult.sentiment,
        approved: moderationResult.approved,
        success: true
      }])

      // Clear form
      setCustomReview({ name: "", rating: 5, comment: "" })

    } catch (error: any) {
      toast({
        title: "Test Failed",
        description: error.message,
        variant: "destructive"
      })
    }

    setCustomTesting(false)
  }

  const clearResults = () => {
    setResults([])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TestTube className="h-5 w-5" />
            <span>AI Moderation Testing</span>
          </CardTitle>
          <CardDescription>
            Test the AI review moderation system with predefined and custom reviews
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Automated Tests */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Automated Tests</h3>
            <p className="text-sm text-muted-foreground">
              This will test {testReviews.length} predefined reviews with expected sentiment outcomes
            </p>
            <Button 
              onClick={runTests} 
              disabled={testing}
              className="w-full"
            >
              {testing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Running Tests...
                </>
              ) : (
                <>
                  <TestTube className="w-4 h-4 mr-2" />
                  Run Automated Tests
                </>
              )}
            </Button>
          </div>

          {/* Custom Test */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-semibold">Custom Test</h3>
            <div className="space-y-3">
              <Input
                placeholder="Reviewer name (optional)"
                value={customReview.name}
                onChange={(e) => setCustomReview(prev => ({ ...prev, name: e.target.value }))}
              />
              <div className="flex items-center space-x-2">
                <span className="text-sm">Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 cursor-pointer transition-colors ${
                      star <= customReview.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                    onClick={() => setCustomReview(prev => ({ ...prev, rating: star }))}
                  />
                ))}
              </div>
              <Textarea
                placeholder="Enter a review comment to test..."
                value={customReview.comment}
                onChange={(e) => setCustomReview(prev => ({ ...prev, comment: e.target.value }))}
                rows={3}
              />
              <Button 
                onClick={testCustomReview} 
                disabled={customTesting || !customReview.comment.trim()}
                className="w-full"
              >
                {customTesting ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Test Custom Review
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-4 border-t pt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Test Results</h3>
                <Button variant="outline" size="sm" onClick={clearResults}>
                  Clear Results
                </Button>
              </div>
              <div className="space-y-3">
                {results.map((result, index) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`border ${
                      result.success 
                        ? (result.expected === result.actual || result.expected === "Custom")
                          ? "border-green-200 bg-green-50" 
                          : "border-yellow-200 bg-yellow-50"
                        : "border-red-200 bg-red-50"
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{result.name}</span>
                            {result.success ? (
                              result.expected === result.actual || result.expected === "Custom" ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <AlertCircle className="h-4 w-4 text-yellow-600" />
                              )
                            ) : (
                              <XCircle className="h-4 w-4 text-red-600" />
                            )}
                          </div>
                          <div className="flex space-x-2">
                            {result.expected !== "Custom" && (
                              <Badge variant="outline">
                                Expected: {result.expected}
                              </Badge>
                            )}
                            <Badge variant={result.approved ? "default" : "secondary"}>
                              {result.actual}
                            </Badge>
                            <Badge variant={result.approved ? "default" : "destructive"}>
                              {result.approved ? "Approved" : "Rejected"}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          "{result.comment}"
                        </p>
                        {result.error && (
                          <p className="text-sm text-red-600">
                            Error: {result.error}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
