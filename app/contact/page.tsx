"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  MessageCircle,
  Calendar,
  Navigation,
  Users
} from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Clinic",
      details: [
        "PhysioHeal Rehabilitation Center",
        "Sector 14, Golf Course Road",
        "Gurgaon, Haryana 122001"
      ],
      action: "Get Directions",
      actionIcon: Navigation
    },
    {
      icon: Phone,
      title: "Call Us",
      details: [
        "+91 98765 43210",
        "+91 11 4567 8900",
        "Emergency: +91 90123 45678"
      ],
      action: "Call Now",
      actionIcon: Phone
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [
        "info@physioheal.com",
        "appointments@physioheal.com",
        "emergency@physioheal.com"
      ],
      action: "Send Email",
      actionIcon: Mail
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: [
        "Mon - Fri: 8:00 AM - 8:00 PM",
        "Saturday: 9:00 AM - 6:00 PM",
        "Sunday: 10:00 AM - 4:00 PM"
      ],
      action: "Book Appointment",
      actionIcon: Calendar
    }
  ]

  const departments = [
    { name: "Orthopedic", phone: "+91 98765 43211", hours: "8 AM - 8 PM" },
    { name: "Neurological", phone: "+91 98765 43212", hours: "9 AM - 7 PM" },
    { name: "Sports Medicine", phone: "+91 98765 43213", hours: "7 AM - 9 PM" },
    { name: "Pediatric", phone: "+91 98765 43214", hours: "10 AM - 6 PM" },
    { name: "Emergency", phone: "+91 90123 45678", hours: "24/7" }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted")
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold font-heading text-foreground mb-6">
              Contact <span className="text-primary">PhysioHeal</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Get in touch with our expert team. We're here to help you on your journey to better health and wellness.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Button asChild className="w-full h-16 text-lg bg-primary hover:bg-primary/90">
                <Link href="/book-appointment">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Appointment
                </Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button asChild variant="outline" className="w-full h-16 text-lg border-primary text-primary hover:bg-primary/10">
                <Link href="tel:+919876543210">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button asChild variant="outline" className="w-full h-16 text-lg border-secondary text-secondary hover:bg-secondary/10">
                <Link href="https://wa.me/919876543210">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
              Get In Touch
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Multiple ways to reach us for appointments, inquiries, or emergency care
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 border-primary/20">
                  <CardHeader className="text-center">
                    <info.icon className="w-12 h-12 text-primary mx-auto mb-3" />
                    <CardTitle className="text-lg font-heading">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="space-y-2 mb-4">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-muted-foreground text-sm">{detail}</p>
                      ))}
                    </div>
                    <Button size="sm" variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                      <info.actionIcon className="w-4 h-4 mr-2" />
                      {info.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Form and Map */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading">Send Us a Message</CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you within 24 hours
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">First Name *</label>
                        <Input placeholder="Enter your first name" required />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Last Name *</label>
                        <Input placeholder="Enter your last name" required />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email *</label>
                      <Input type="email" placeholder="Enter your email" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Phone Number *</label>
                      <Input type="tel" placeholder="Enter your phone number" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Service Needed</label>
                      <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                        <option value="">Select a service</option>
                        <option value="orthopedic">Orthopedic Physiotherapy</option>
                        <option value="neurological">Neurological Rehabilitation</option>
                        <option value="sports">Sports Injury</option>
                        <option value="pediatric">Pediatric Care</option>
                        <option value="pain">Pain Management</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Message *</label>
                      <Textarea 
                        placeholder="Tell us about your condition or questions..."
                        rows={5}
                        required 
                      />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Location and Departments */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="border-secondary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading flex items-center">
                    <MapPin className="w-6 h-6 text-secondary mr-2" />
                    Our Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                      <p className="text-muted-foreground">Interactive Map</p>
                      <p className="text-sm text-muted-foreground">Golf Course Road, Gurgaon</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold">PhysioHeal Rehabilitation Center</p>
                    <p className="text-muted-foreground text-sm">
                      Sector 14, Golf Course Road<br/>
                      Gurgaon, Haryana 122001<br/>
                      Near Metro Station
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-heading flex items-center">
                    <Users className="w-5 h-5 text-primary mr-2" />
                    Department Contact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {departments.map((dept, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                        <div>
                          <p className="font-semibold text-sm">{dept.name}</p>
                          <p className="text-xs text-muted-foreground">{dept.hours}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-primary text-sm font-medium">{dept.phone}</p>
                          <Badge variant="secondary" className="text-xs mt-1">
                            Direct Line
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Need Emergency Care?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              For urgent physiotherapy needs or severe pain, contact our emergency line immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="tel:+919012345678">
                  <Phone className="w-5 h-5 mr-2" />
                  Emergency: +91 90123 45678
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                <Link href="https://wa.me/919012345678">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Emergency WhatsApp
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}