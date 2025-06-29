import { Metadata } from "next"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Clock, Users, Heart, Target, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | PhysioHeal Clinic - Expert Physiotherapy Team",
  description: "Meet our certified physiotherapy team with 5+ years of experience in orthopedic care, sports injuries, and rehabilitation.",
}

const achievements = [
  { icon: Users, label: "500+ Patients Treated", value: "500+" },
  { icon: Award, label: "Years of Experience", value: "5+" },
  { icon: Star, label: "Average Rating", value: "4.9" },
  { icon: Heart, label: "Success Rate", value: "95%" },
]

const team = [
  {
    name: "Dr. Sarah Johnson",
    role: "Lead Physiotherapist",
    credentials: "BPT, MPT (Orthopedics)",
    experience: "5+ years",
    specialization: "Sports Injuries, Manual Therapy",
    image: "/placeholder-user.jpg"
  },
  {
    name: "Dr. Michael Chen",
    role: "Senior Physiotherapist", 
    credentials: "BPT, MPT (Neurology)",
    experience: "4+ years",
    specialization: "Neurological Rehabilitation",
    image: "/placeholder-user.jpg"
  }
]

export default function AboutPage() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container-mobile py-8 md:py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 md:mb-6">
            About <span className="gradient-text">PhysioHeal</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Dedicated to providing exceptional physiotherapy care with a focus on 
            personalized treatment plans and cutting-edge therapeutic techniques.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <Card className="glass-card card-3d text-center h-full">
                <CardContent className="p-4 md:p-6">
                  <achievement.icon className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 text-primary" />
                  <div className="text-xl md:text-2xl font-bold mb-1 font-heading">{achievement.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">{achievement.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 md:mb-16"
        >
          <Card className="glass-card card-3d">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-heading text-lg md:text-xl">
                <Target className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                At PhysioHeal, our mission is to empower individuals to achieve their optimal physical health 
                through evidence-based physiotherapy treatments. We combine traditional therapeutic techniques 
                with modern technology to deliver personalized care that addresses each patient's unique needs 
                and goals.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Team */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-8 md:mb-12">
            Meet Our <span className="gradient-text">Expert Team</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              >
                <Card className="glass-card card-3d h-full">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-heading font-semibold text-base md:text-lg">{member.name}</h3>
                        <p className="text-primary font-medium text-sm md:text-base">{member.role}</p>
                        <p className="text-xs md:text-sm text-muted-foreground mb-2">{member.credentials}</p>
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {member.experience}
                        </Badge>
                        <p className="text-xs md:text-sm text-muted-foreground">{member.specialization}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-primary to-secondary text-white card-3d pulse-glow-3d">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-heading font-bold mb-4">Ready to Start Your Healing Journey?</h2>
              <p className="mb-6 text-sm md:text-base">
                Book a consultation with our expert physiotherapists today.
              </p>
              <Button 
                variant="secondary" 
                size="lg" 
                className="btn-3d bg-white text-primary hover:bg-white/90 font-semibold px-6 md:px-8 py-2 md:py-3"
              >
                Book Appointment
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}