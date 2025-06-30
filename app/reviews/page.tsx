"use client";

import React from "react";
import { motion } from "framer-motion";
import { ReviewForm } from "@/components/review-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const featuredReviews = [
  {
    name: "Sarah Johnson",
    rating: 5,
    comment: "Outstanding care and professionalism. The team helped me recover from my knee injury faster than I expected.",
    date: "2 weeks ago"
  },
  {
    name: "Michael Chen",
    rating: 5,
    comment: "Excellent physiotherapy services. The staff is knowledgeable and the treatment plans are very effective.",
    date: "1 month ago"
  },
  {
    name: "Emma Wilson",
    rating: 5,
    comment: "Highly recommend! The personalized approach to treatment made all the difference in my recovery.",
    date: "3 weeks ago"
  }
];

export default function ReviewsPage() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Patient <span className="text-primary">Reviews</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what our patients say about their experience with our physiotherapy services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Featured Reviews */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6">What Our Patients Say</h2>
            <div className="space-y-6">
              {featuredReviews.map((review, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <CardDescription>{review.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start space-x-2">
                      <Quote className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground italic">
                        {review.comment}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Review Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ReviewForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}