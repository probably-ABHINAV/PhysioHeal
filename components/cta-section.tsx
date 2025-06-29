
"use client"

import { motion } from "framer-motion"
import { ArrowRight, Calendar, Phone, Star, Shield, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,rgba(255,255,255,0.05)_50%,transparent_60%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to Start Your{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Recovery Journey?
              </span>
            </h2>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join hundreds of patients who have successfully recovered with our expert physiotherapy care. 
              Your path to pain-free living starts with a single appointment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
                onClick={() => window.location.href = '/book-appointment'}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Consultation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg font-semibold transition-all duration-300 group"
                onClick={() => window.location.href = 'tel:+1234567890'}
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
                <span className="ml-2 group-hover:scale-110 transition-transform">📞</span>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-blue-100 font-medium">4.9/5 Rating</span>
              </div>

              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-blue-100 font-medium">Licensed & Insured</span>
              </div>

              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-400" />
                <span className="text-blue-100 font-medium">5+ Years Experience</span>
              </div>
            </div>
          </motion.div>

          {/* Features Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {[
              {
                title: "Free Initial Consultation",
                description: "Comprehensive assessment and personalized treatment plan",
                icon: "🩺",
                highlight: "Worth $150"
              },
              {
                title: "Same Day Appointments",
                description: "Emergency slots available for urgent cases",
                icon: "⚡",
                highlight: "Available Today"
              },
              {
                title: "Insurance Accepted",
                description: "We work with most major insurance providers",
                icon: "🛡️",
                highlight: "Direct Billing"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{feature.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                          <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full font-medium">
                            {feature.highlight}
                          </span>
                        </div>
                        <p className="text-blue-100 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            { number: "500+", label: "Patients Treated" },
            { number: "95%", label: "Success Rate" },
            { number: "5+", label: "Years Experience" },
            { number: "24/7", label: "Emergency Support" }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1, type: "spring", stiffness: 200 }}
                className="text-3xl md:text-4xl font-bold text-white mb-2"
              >
                {stat.number}
              </motion.div>
              <div className="text-blue-200 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
