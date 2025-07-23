"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Star, 
  Check, 
  X, 
  Calendar, 
  Mail, 
  MessageCircle,
  AlertCircle,
  CheckCircle2,
  XCircle,
  User,
  Filter,
  Search
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { getReviews, approveReview } from "@/lib/supabase"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface ReviewsManagementProps {
  onUpdate?: () => void
}

interface Review {
  id: string
  name: string | null
  email: string | null
  rating: number
  comment: string
  service: string | null
  approved: boolean
  created_at: string
}

export function ReviewsManagement({ onUpdate }: ReviewsManagementProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('pending')
  const [searchTerm, setSearchTerm] = useState('')
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set())

  const { toast } = useToast()
  const supabase = createClientComponentClient()

  useEffect(() => {
    loadReviews()
  }, [filter])

  const loadReviews = async () => {
    try {
      setLoading(true)

      // Fetch all reviews regardless of approval status
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      const allReviews = data || []

      // Filter based on selected filter
      let filteredReviews = allReviews
      if (filter === 'pending') {
        filteredReviews = allReviews.filter(r => !r.approved)
      } else if (filter === 'approved') {
        filteredReviews = allReviews.filter(r => r.approved)
      }

      setReviews(filteredReviews)
    } catch (error) {
      console.error('Error loading reviews:', error)
      toast({
        title: "Error",
        description: "Failed to load reviews",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (reviewId: string) => {
    setProcessingIds(prev => new Set(prev).add(reviewId))

    try {
      const { error } = await supabase
        .from('reviews')
        .update({ approved: true })
        .eq('id', reviewId)

      if (error) throw error

      // Update local state
      setReviews(prev => prev.map(review => 
        review.id === reviewId 
          ? { ...review, approved: true }
          : review
      ))

      toast({
        title: "Review Approved",
        description: "The review has been approved and is now public",
      })

      onUpdate?.()

      // Reload if we're filtering by pending
      if (filter === 'pending') {
        loadReviews()
      }
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
        newSet.delete(reviewId)
        return newSet
      })
    }
  }

  const handleReject = async (reviewId: string) => {
    setProcessingIds(prev => new Set(prev).add(reviewId))

    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId)

      if (error) throw error

      // Remove from local state
      setReviews(prev => prev.filter(review => review.id !== reviewId))

      toast({
        title: "Review Rejected",
        description: "The review has been deleted",
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
        newSet.delete(reviewId)
        return newSet
      })
    }
  }

  const filteredReviews = reviews.filter(review => 
    review.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const pendingCount = reviews.filter(r => !r.approved).length
  const approvedCount = reviews.filter(r => r.approved).length

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Star className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reviews</p>
                <p className="text-2xl font-bold text-blue-600">{pendingCount + approvedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Review Management
          </CardTitle>
          <CardDescription>
            Review and moderate customer feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative w-full">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
  <input
    placeholder="Search..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full pl-9"
  />
</div>

            </div>
            <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter reviews" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending ({pendingCount})</SelectItem>
                <SelectItem value="approved">Approved ({approvedCount})</SelectItem>
                <SelectItem value="all">All Reviews</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reviews List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading reviews...</p>
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {filter === 'pending' ? 'No pending reviews' : 
                 filter === 'approved' ? 'No approved reviews' : 'No reviews found'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`${!review.approved ? 'border-yellow-200 bg-yellow-50/50' : 'border-green-200 bg-green-50/50'}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{review.name || "Anonymous"}</span>
                              </div>
                              {review.email && (
                                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                  <Mail className="h-3 w-3" />
                                  <span>{review.email}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={review.approved ? "default" : "secondary"}>
                                {review.approved ? "Approved" : "Pending"}
                              </Badge>
                              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(review.created_at).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium">{review.rating}/5</span>
                            {review.service && (
                              <Badge variant="outline" className="text-xs">
                                {review.service}
                              </Badge>
                            )}
                          </div>

                          <p className="text-muted-foreground">{review.comment}</p>

                          {!review.approved && (
                            <div className="flex items-center space-x-2 pt-2">
                              <Button
                                size="sm"
                                onClick={() => handleApprove(review.id)}
                                disabled={processingIds.has(review.id)}
                                className="flex items-center space-x-1"
                              >
                                <Check className="h-4 w-4" />
                                <span>Approve</span>
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleReject(review.id)}
                                disabled={processingIds.has(review.id)}
                                className="flex items-center space-x-1"
                              >
                                <X className="h-4 w-4" />
                                <span>Reject</span>
                              </Button>
                            </div>
                          )}
                        </div>
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