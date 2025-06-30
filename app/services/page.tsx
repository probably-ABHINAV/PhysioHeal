import { Metadata } from "next"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Stethoscope, 
  Heart, 
  Zap, 
  Shield, 
  Clock, 
  Award,
  CheckCircle,
  Star
} from "lucide-react"

export const metadata: Metadata = {
  title: "Services | PhysioHeal Clinic - Comprehensive Physiotherapy Care",
  description: "Professional physiotherapy services including sports injury treatment, manual therapy, exercise therapy, and post-surgery rehabilitation.",
}

const services = [
  {
    icon: Stethoscope,
    title: "Manual Therapy",
    description: "Hands-on techniques to improve mobility and reduce pain",
    features: ["Joint mobilization", "Soft tissue massage", "Trigger point therapy"],
    duration: "45-60 mins",
    price: "₹800-1200"
  },
  {
    icon: Zap,
    title: "Exercise Therapy", 
    description: "Customized exercise programs for rehabilitation and prevention",
    features: ["Strength training", "Flexibility exercises", "Functional movement"],
    duration: "60 mins",
    price: "₹600-1000"
  },
  {
    icon: Heart,
    title: "Sports Physiotherapy",
    description: "Specialized treatment for sports-related injuries",
    features: ["Injury assessment", "Return-to-sport planning", "Performance optimization"],
    duration: "60-90 mins", 
    price: "₹1000-1500"
  },
  {
    icon: Shield,
    title: "Post-Surgery Rehabilitation",
    description: "Comprehensive recovery programs after surgical procedures",
    features: ["Pain management", "Range of motion", "Strength restoration"],
    duration: "45-75 mins",
    price: "₹900-1300"
  }
]

const specialties = [
  "Orthopedic Physiotherapy",
  "Neurological Rehabilitation", 
  "Pediatric Physiotherapy",
  "Geriatric Care",
  "Women's Health",
  "Cardiopulmonary Rehabilitation"
]

export default function ServicesPage() {
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
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive physiotherapy services tailored to your specific needs and recovery goals.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <Card className="glass-card card-3d h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <service.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg md:text-xl font-heading">{service.title}</CardTitle>
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-sm md:text-base">What's Included:</h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs md:text-sm">
                            <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t gap-3">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                          <span className="text-xs md:text-sm text-muted-foreground">{service.duration}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">{service.price}</Badge>
                      </div>
                      <Button size="sm" className="btn-3d w-full sm:w-auto">Book Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Specialties */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <Card className="glass-card card-3d">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-heading text-lg md:text-xl">
                <Award className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                Our Specialties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {specialties.map((specialty, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <Star className="h-3 w-3 md:h-4 md:w-4 text-primary flex-shrink-0" />
                    <span className="text-xs md:text-sm">{specialty}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
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
              <h2 className="text-xl md:text-2xl font-heading font-bold mb-4">Ready to Get Started?</h2>
              <p className="mb-6 text-sm md:text-base">
                Book your consultation today and take the first step towards recovery.
              </p>
              <Button 
                variant="secondary" 
                size="lg" 
                className="btn-3d bg-white text-primary hover:bg-white/90 font-semibold px-6 md:px-8 py-2 md:py-3"
              >
                Schedule Consultation
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}