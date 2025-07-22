"use client"

import { motion } from "framer-motion"
import { Award, GraduationCap, Clock, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const teamMembers = [
  {
    name: "Dr. Priya Sharma",
    role: "Lead Physiotherapist & Founder",
    image: "/placeholder.svg?height=300&width=300",
    qualifications: ["BPT", "MPT Ortho"],
    experience: "5+ Years",
    specializations: ["Orthopedic Rehabilitation", "Sports Injury Recovery", "Manual Therapy"],
    bio: "Dr. Priya Sharma is a dedicated physiotherapist with over 5 years of experience in orthopedic rehabilitation. She founded PhysioHeal with a vision to provide personalized, evidence-based physiotherapy care. Her expertise in sports injury recovery and manual therapy has helped hundreds of patients return to their active lifestyles.",
    achievements: [
      "Certified Manual Therapy Specialist",
      "Sports Injury Rehabilitation Expert",
      "Published researcher in orthopedic physiotherapy",
      "500+ successful patient recoveries",
    ],
  },
  {
    name: "Dr. Rajesh Kumar",
    role: "Senior Physiotherapist",
    image: "/placeholder.svg?height=300&width=300",
    qualifications: ["BPT", "MPT Neuro"],
    experience: "4+ Years",
    specializations: ["Neurological Rehabilitation", "Stroke Recovery", "Balance Training"],
    bio: "Dr. Rajesh Kumar specializes in neurological rehabilitation with extensive experience in treating stroke patients and individuals with neurological conditions. His compassionate approach and expertise in balance training have made significant impacts on patients' quality of life.",
    achievements: [
      "Neurological Rehabilitation Specialist",
      "Certified in NDT (Neuro-Developmental Treatment)",
      "Expert in vestibular rehabilitation",
      "200+ neurological patients treated",
    ],
  },
  {
    name: "Dr. Anita Patel",
    role: "Pediatric Physiotherapist",
    image: "/placeholder.svg?height=300&width=300",
    qualifications: ["BPT", "MPT Pediatrics"],
    experience: "3+ Years",
    specializations: ["Pediatric Physiotherapy", "Developmental Delays", "Cerebral Palsy"],
    bio: "Dr. Anita Patel is our pediatric physiotherapy specialist, dedicated to helping children reach their developmental milestones. Her gentle approach and specialized training in pediatric conditions make her an invaluable member of our team.",
    achievements: [
      "Pediatric Physiotherapy Specialist",
      "Early Intervention Certified",
      "Sensory Integration Therapy Expert",
      "150+ children successfully treated",
    ],
  },
]

export default function TeamPage() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Meet Our <span className="gradient-text">Expert Team</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Dedicated professionals committed to your health and recovery
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                      {/* Image */}
                      <div className={`relative h-96 lg:h-auto ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>

                      {/* Content */}
                      <div
                        className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? "lg:col-start-1" : ""}`}
                      >
                        <div className="mb-6">
                          <h2 className="text-3xl font-heading font-bold mb-2">{member.name}</h2>
                          <p className="text-xl text-primary font-medium mb-4">{member.role}</p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {member.qualifications.map((qual) => (
                              <Badge key={qual} variant="secondary">
                                {qual}
                              </Badge>
                            ))}
                            <Badge variant="outline">
                              <Clock className="w-3 h-3 mr-1" />
                              {member.experience}
                            </Badge>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h3 className="font-semibold mb-3 flex items-center">
                            <GraduationCap className="w-5 h-5 mr-2 text-primary" />
                            Specializations
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {member.specializations.map((spec) => (
                              <Badge key={spec} variant="outline" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="mb-6">
                          <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-3 flex items-center">
                            <Award className="w-5 h-5 mr-2 text-primary" />
                            Key Achievements
                          </h3>
                          <ul className="space-y-2">
                            {member.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex items-start">
                                <Star className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Our Team's Impact</h2>
            <p className="text-xl text-white/90">Combined expertise delivering exceptional results</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "12+", label: "Years Combined Experience" },
              { value: "850+", label: "Patients Treated" },
              { value: "15+", label: "Specializations" },
              { value: "98%", label: "Patient Satisfaction" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center text-white"
              >
                <div className="text-4xl lg:text-5xl font-bold font-heading mb-2">{stat.value}</div>
                <div className="text-white/90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
