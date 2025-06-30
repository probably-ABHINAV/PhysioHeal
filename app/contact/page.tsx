
import { Metadata } from "next"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us | PhysioHeal Clinic - Get in Touch",
  description: "Contact PhysioHeal Clinic for appointments, inquiries, or to learn more about our physiotherapy services. Located in Gurgaon, Haryana.",
}

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    details: ["Palam Vihar, Gurgaon", "Haryana, India - 122017"]
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+91 7979855427", "Mon-Sat: 9 AM - 7 PM"]
  },
  {
    icon: Mail,
    title: "Email", 
    details: ["info@physioheal.com", "appointments@physioheal.com"]
  },
  {
    icon: Clock,
    title: "Hours",
    details: ["Mon-Fri: 9 AM - 7 PM", "Saturday: 9 AM - 2 PM", "Sunday: Closed"]
  }
]

export default function ContactPage() {
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
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to start your healing journey? Contact us today to schedule your consultation 
            or learn more about our physiotherapy services.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-card card-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-heading text-lg md:text-xl">
                  <MessageSquare className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4 md:space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                      <Input id="firstName" placeholder="John" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" className="mt-1" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+91 9876543210" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="service" className="text-sm font-medium">Service Interest</Label>
                    <select className="w-full border border-input rounded-md px-3 py-2 mt-1 text-sm bg-background">
                      <option value="">Select a service</option>
                      <option value="manual-therapy">Manual Therapy</option>
                      <option value="exercise-therapy">Exercise Therapy</option>
                      <option value="sports-physio">Sports Physiotherapy</option>
                      <option value="post-surgery">Post-Surgery Rehabilitation</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us about your condition or questions..." 
                      rows={4}
                      className="mt-1"
                    />
                  </div>

                  <Button className="w-full btn-3d" size="lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4 md:space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <Card className="glass-card card-3d">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="p-2 md:p-3 bg-primary/10 rounded-lg">
                        <info.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-base md:text-lg mb-1 md:mb-2">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-muted-foreground text-sm md:text-base">{detail}</p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 card-3d">
                <CardContent className="p-4 md:p-6 text-center">
                  <h3 className="font-heading font-semibold text-base md:text-lg mb-2">Quick Response via WhatsApp</h3>
                  <p className="text-muted-foreground mb-4 text-sm md:text-base">
                    Get instant responses to your queries and book appointments directly.
                  </p>
                  <Button className="bg-green-500 hover:bg-green-600 text-white btn-3d">
                    Chat on WhatsApp
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-8 md:mt-12"
        >
          <Card className="glass-card card-3d">
            <CardHeader>
              <CardTitle className="font-heading text-lg md:text-xl">Find Us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 h-48 md:h-64 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground text-sm md:text-base">Google Maps Integration</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}