
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// This would typically come from a CMS or database
const blogPosts = {
  "back-pain-exercises": {
    title: "5 Essential Exercises for Lower Back Pain Relief",
    excerpt: "Discover simple yet effective exercises that can help alleviate lower back pain and prevent future episodes.",
    content: `
      <h2>Understanding Lower Back Pain</h2>
      <p>Lower back pain affects millions of people worldwide and is one of the leading causes of disability. Whether caused by poor posture, muscle strain, or underlying conditions, the right exercises can provide significant relief.</p>
      
      <h2>The 5 Essential Exercises</h2>
      
      <h3>1. Cat-Cow Stretch</h3>
      <p>This gentle spinal mobilization exercise helps improve flexibility and reduce stiffness in your lower back.</p>
      <ul>
        <li>Start on hands and knees</li>
        <li>Alternate between arching and rounding your back</li>
        <li>Hold each position for 2-3 seconds</li>
        <li>Repeat 10-15 times</li>
      </ul>
      
      <h3>2. Knee-to-Chest Stretch</h3>
      <p>This stretch targets the lower back muscles and hip flexors, providing gentle relief from tension.</p>
      
      <h3>3. Pelvic Tilts</h3>
      <p>Strengthen your core while gently mobilizing your lower back with this foundational exercise.</p>
      
      <h3>4. Bird Dog</h3>
      <p>Improve stability and strengthen your core and back muscles simultaneously.</p>
      
      <h3>5. Child's Pose</h3>
      <p>A restorative pose that gently stretches the lower back and promotes relaxation.</p>
      
      <h2>When to Seek Professional Help</h2>
      <p>While these exercises can provide relief for many people, it's important to consult with a physiotherapist if your pain persists or worsens. Professional assessment can identify underlying issues and create a personalized treatment plan.</p>
      
      <h2>Conclusion</h2>
      <p>Consistency is key when it comes to managing lower back pain. Incorporate these exercises into your daily routine and listen to your body. Remember, what works for one person may not work for another, so don't hesitate to seek professional guidance.</p>
    `,
    author: "Dr. Sarah Johnson",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Pain Management",
    tags: ["back pain", "exercises", "pain relief"],
    image: "/placeholder.jpg"
  }
  // Add more blog posts here
}

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts[params.slug as keyof typeof blogPosts]
  
  if (!post) {
    return {
      title: "Post Not Found | PhysioHeal Blog"
    }
  }

  return {
    title: `${post.title} | PhysioHeal Blog`,
    description: post.excerpt,
    keywords: post.tags.join(", "),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
      publishedTime: post.date,
      authors: [post.author]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image]
    }
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts[params.slug as keyof typeof blogPosts]
  
  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Button */}
        <Link href="/blog">
          <Button variant="outline" className="mb-8 group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Button>
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="mb-6">
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Share Button */}
          <Button variant="outline" className="group">
            <Share2 className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            Share Article
          </Button>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200/50">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </article>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-2xl p-8 text-center backdrop-blur-sm border border-blue-200/50">
          <h3 className="text-2xl font-bold mb-4">Need Professional Help?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            If you're experiencing persistent pain or need personalized guidance, our expert physiotherapists are here to help.
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            onClick={() => window.location.href = '/book-appointment'}
          >
            Book Free Consultation
          </Button>
        </div>
      </div>
    </div>
  )
}
