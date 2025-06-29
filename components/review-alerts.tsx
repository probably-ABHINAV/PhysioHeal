
"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Eye,
  Star,
  Calendar,
  User,
  MessageCircle
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface ReviewAlert {
  id: string
  review_id: string
  sentiment: string
  created_at: string
  resolved: boolean
  resolved_at: string | null
  resolved_by: string | null
  reviews: {
    id: string
    name: string
    rating: number
    comment: string
    service: string | null
    email: string | null
    created_at: string
    approved: boolean
  }
}

interface ReviewAlertsProps {
  onUpdate?: () => void
}

export function ReviewAlerts({ onUpdate }: ReviewAlertsProps) {
  const [alerts, setAlerts] = useState<ReviewAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set())
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  useEffect(() => {
    loadAlerts()
  }, [])

  const loadAlerts = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('review_alerts')
        .select(`
          *,
          reviews (
            id,
            name,
            rating,
            comment,
            service,
            email,
            created_at,
            approved
          )
        `)
        .eq('resolved', false)
        .order('created_at', { ascending: false })

      if (error) throw error
      setAlerts(data || [])
    } catch (error) {
      console.error('Error loading alerts:', error)
      toast({
        title: "Error",
        description: "Failed to load review alerts",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleApproveReview = async (alertId: string, reviewId: string) => {
    setProcessingIds(prev => new Set(prev).add(alertId))

    try {
      // Approve the review
      const { error: reviewError } = await supabase
        .from('reviews')
        .update({ approved: true })
        .eq('id', reviewId)

      if (reviewError) throw reviewError

      // Mark alert as resolved
      const { error: alertError } = await supabase
        .from('review_alerts')
        .update({ 
          resolved: true,
          resolved_at: new Date().toISOString()
        })
        .eq('id', alertId)

      if (alertError) throw alertError

      // Remove from local state
      setAlerts(prev => prev.filter(alert => alert.id !== alertId))

      toast({
        title: "Review Approved",
        description: "The review has been approved and is now public",
      })

      onUpdate?.()
    } catch (error) {
      console.error('Error approving review:', error)
      toast({
        title: "Error",
        description: "Failed to approve review",
        variant: "destructive"
      })
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(alertId)
        return newSet
      })
    }
  }

  const handleRejectReview = async (alertId: string, reviewId: string) => {
    setProcessingIds(prev => new Set(prev).add(alertId))

    try {
      // Delete the review
      const { error: reviewError } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId)

      if (reviewError) throw reviewError

      // Mark alert as resolved
      const { error: alertError } = await supabase
        .from('review_alerts')
        .update({ 
          resolved: true,
          resolved_at: new Date().toISOString()
        })
        .eq('id', alertId)

      if (alertError) throw alertError

      // Remove from local state
      setAlerts(prev => prev.filter(alert => alert.id !== alertId))

      toast({
        title: "Review Rejected",
        description: "The review has been removed",
      })

      onUpdate?.()
    } catch (error) {
      console.error('Error rejecting review:', error)
      toast({
        title: "Error",
        description: "Failed to reject review",
        variant: "destructive"
      })
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(alertId)
        return newSet
      })
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive': return 'text-green-600'
      case 'negative': return 'text-red-600'
      case 'neutral': return 'text-yellow-600'
      default: return 'text-gray-600'
    }
  }

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive': return 'default'
      case 'negative': return 'destructive'
      case 'neutral': return 'secondary'
      default: return 'outline'
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <span>Review Alerts</span>
            {alerts.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {alerts.length}
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Reviews flagged by AI for manual review
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading alerts...</p>
            </div>
          ) : alerts.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="text-muted-foreground">No pending review alerts</p>
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-yellow-200 bg-yellow-50/50">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Alert Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <AlertTriangle className="h-5 w-5 text-yellow-500" />
                            <Badge variant={getSentimentBadge(alert.sentiment)}>
                              AI: {alert.sentiment}
                            </Badge>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{new Date(alert.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>

                        {/* Review Content */}
                        {alert.reviews && (
                          <div className="bg-white rounded-lg p-4 border">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                  <span className="font-medium">{alert.reviews.name || "Anonymous"}</span>
                                </div>
                                {alert.reviews.email && (
                                  <span className="text-sm text-muted-foreground">
                                    {alert.reviews.email}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < alert.reviews.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                {alert.reviews.service && (
                                  <Badge variant="outline" className="text-xs">
                                    {alert.reviews.service}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <p className="text-muted-foreground mb-4 italic">
                              "{alert.reviews.comment}"
                            </p>

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                onClick={() => handleApproveReview(alert.id, alert.reviews.id)}
                                disabled={processingIds.has(alert.id)}
                                className="flex items-center space-x-1"
                              >
                                <CheckCircle className="h-4 w-4" />
                                <span>Approve & Publish</span>
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRejectReview(alert.id, alert.reviews.id)}
                                disabled={processingIds.has(alert.id)}
                                className="flex items-center space-x-1"
                              >
                                <AlertTriangle className="h-4 w-4" />
                                <span>Reject & Remove</span>
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
