
import { Metadata } from "next"
import { motion } from "framer-motion"
import { Calendar, Clock, User, ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blog | PhysioHeal Clinic - Expert Tips & Insights",
  description: "Expert physiotherapy tips, injury prevention advice, and wellness insights from our certified physiotherapists.",
  keywords: ["physiotherapy tips", "injury prevention", "exercise guides", "pain management", "wellness advice"],
}

const blogPosts = [
  {
    id: "back-pain-exercises",
    title: "5 Essential Exercises for Lower Back Pain Relief",
    excerpt: "Discover simple yet effective exercises that can help alleviate lower back pain and prevent future episodes.",
    content: "Lower back pain affects millions of people worldwide...",
    author: "Dr. Sarah Johnson",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Pain Management",
    image: "/placeholder.jpg",
    tags: ["back pain", "exercises", "pain relief"]
  },
  {
    id: "sports-injury-prevention",
    title: "How to Prevent Common Sports Injuries",
    excerpt: "Learn the key strategies athletes use to stay injury-free and maintain peak performance throughout their season.",
    content: "Sports injuries can sideline athletes for weeks or months...",
    author: "Dr. Michael Chen",
    date: "2024-01-10",
    readTime: "7 min read",
    category: "Sports Medicine",
    image: "/placeholder.jpg",
    tags: ["sports", "injury prevention", "athletes"]
  },
  {
    id: "desk-posture-guide",
    title: "The Complete Guide to Proper Desk Posture",
    excerpt: "Transform your workspace and eliminate neck and shoulder pain with these evidence-based posture tips.",
    content: "Poor desk posture is a leading cause of workplace injuries...",
    author: "Dr. Emily Rodriguez",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "Ergonomics",
    image: "/placeholder.jpg",
    tags: ["posture", "workplace", "ergonomics"]
  },
  {
    id: "post-workout-recovery",
    title: "Optimal Post-Workout Recovery Strategies",
    excerpt: "Maximize your training gains and reduce injury risk with these professional recovery techniques.",
    content: "Recovery is just as important as the workout itself...",
    author: "Dr. Sarah Johnson",
    date: "2024-01-01",
    readTime: "4 min read",
    category: "Recovery",
    image: "/placeholder.jpg",
    tags: ["recovery", "workout", "performance"]
  },
  {
    id: "knee-pain-causes",
    title: "Understanding Knee Pain: Causes and Solutions",
    excerpt: "Explore the most common causes of knee pain and learn when to seek professional physiotherapy treatment.",
    content: "Knee pain can significantly impact your daily activities...",
    author: "Dr. Michael Chen",
    date: "2023-12-28",
    readTime: "8 min read",
    category: "Joint Health",
    image: "/placeholder.jpg",
    tags: ["knee pain", "joint health", "treatment"]
  },
  {
    id: "home-exercise-routine",
    title: "Building an Effective Home Exercise Routine",
    excerpt: "Create a comprehensive home workout plan that supports your physiotherapy goals and overall wellness.",
    content: "Maintaining fitness at home requires proper planning...",
    author: "Dr. Emily Rodriguez",
    date: "2023-12-25",
    readTime: "6 min read",
    category: "Exercise",
    image: "/placeholder.jpg",
    tags: ["home exercise", "fitness", "routine"]
  }
]

const categories = ["All", "Pain Management", "Sports Medicine", "Ergonomics", "Recovery", "Joint Health", "Exercise"]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              PhysioHeal <span className="text-yellow-300">Blog</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Expert insights, tips, and advice from our certified physiotherapists to help you stay healthy and pain-free.
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Input 
                type="text" 
                placeholder="Search articles..."
                className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 pr-12"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-200" />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {categories.map((category) => (
            <Badge 
              key={category}
              variant={category === "All" ? "default" : "outline"}
              className="cursor-pointer hover:bg-blue-600 hover:text-white transition-colors px-4 py-2"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden group">
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="aspect-video bg-gradient-to-r from-blue-600 to-cyan-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/20 text-white border-white/30">
                        {post.category}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-white text-xl font-bold text-center px-4">
                        {post.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Link href={`/blog/${post.id}`}>
                      <Button className="w-full group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-2xl p-8 text-center backdrop-blur-sm border border-blue-200/50"
        >
          <h3 className="text-2xl font-bold mb-4">Stay Updated with Our Latest Articles</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get weekly tips, exercise guides, and health insights delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input type="email" placeholder="Enter your email" className="flex-1" />
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
              Subscribe
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
