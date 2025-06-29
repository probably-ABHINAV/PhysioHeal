
"use client"

import { motion } from "framer-motion"
import { ArrowRight, Clock, Users, Award, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ServicesPreview() {
  const services = [
    {
      title: "Sports Physiotherapy",
      description: "Specialized treatment for athletes and sports injuries",
      icon: "🏃‍♂️",
      duration: "45-60 min",
      popularity: "Most Popular",
      features: ["Injury Prevention", "Performance Enhancement", "Return to Sport"]
    },
    {
      title: "Manual Therapy",
      description: "Hands-on treatment techniques for pain relief",
      icon: "👐",
      duration: "30-45 min",
      popularity: "Recommended",
      features: ["Joint Mobilization", "Soft Tissue Massage", "Pain Relief"]
    },
    {
      title: "Exercise Rehabilitation",
      description: "Customized exercise programs for recovery",
      icon: "💪",
      duration: "60 min",
      popularity: "Comprehensive",
      features: ["Strength Building", "Flexibility", "Functional Movement"]
    },
    {
      title: "Post-Surgery Recovery",
      description: "Specialized care for post-operative rehabilitation",
      icon: "🏥",
      duration: "45 min",
      popularity: "Specialized",
      features: ["Scar Management", "Range of Motion", "Strength Recovery"]
    },
    {
      title: "Pain Management",
      description: "Advanced techniques for chronic pain relief",
      icon: "🎯",
      duration: "30-60 min",
      popularity: "Effective",
      features: ["Dry Needling", "TENS Therapy", "Heat/Cold Therapy"]
    },
    {
      title: "Dry Needling",
      description: "Trigger point therapy for muscle tension relief",
      icon: "📍",
      duration: "30 min",
      popularity: "Advanced",
      features: ["Trigger Points", "Muscle Relaxation", "Pain Reduction"]
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
            Our Expertise
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Comprehensive <span className="gradient-text">Physiotherapy Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From sports injuries to chronic pain, we offer specialized treatments tailored to your unique needs. 
            Our evidence-based approach ensures the best possible outcomes.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105 overflow-hidden">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)]" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-3xl">{service.icon}</div>
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                          {service.popularity}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                      <p className="text-blue-100 text-sm">{service.description}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{service.duration}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300"
                      onClick={() => window.location.href = '/book-appointment'}
                    >
                      Book Session
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-2xl p-8 backdrop-blur-sm border border-blue-200/50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <h3 className="text-2xl font-bold mb-2">Not sure which service you need?</h3>
                <p className="text-muted-foreground">
                  Book a free consultation and let our experts create a personalized treatment plan for you.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 whitespace-nowrap"
                  onClick={() => window.location.href = '/book-appointment'}
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Free Consultation
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => window.location.href = '/services'}
                >
                  View All Services
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
