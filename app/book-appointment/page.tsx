"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Phone, MessageSquare, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
]

const services = [
  "Sports Injury Recovery",
  "Pain Management",
  "Orthopedic Care",
  "Rehabilitation Therapy",
  "Cardiac Rehabilitation",
  "Neurological Rehabilitation",
  "Geriatric Physiotherapy",
  "Respiratory Therapy",
]

export default function BookAppointmentPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    concern: "",
    whatsappConfirmation: false,
    callConfirmation: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create WhatsApp message
    if (formData.whatsappConfirmation) {
      const message = `Hi! I'd like to book an appointment:
      
Name: ${formData.name}
Service: ${formData.service}
Date: ${formData.date}
Time: ${formData.time}
Concern: ${formData.concern}
Phone: ${formData.phone}

Please confirm my appointment. Thank you!`

      const whatsappUrl = `https://api.whatsapp.com/send?phone=+919876543210&text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, "_blank")
    }

    // Handle call confirmation
    if (formData.callConfirmation) {
      window.open("tel:+919876543210", "_self")
    }

    toast({
      title: "Appointment Request Sent!",
      description: "We'll contact you shortly to confirm your appointment.",
    })

    setIsSubmitting(false)

    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      service: "",
      date: "",
      time: "",
      concern: "",
      whatsappConfirmation: false,
      callConfirmation: false,
    })
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Book Your <span className="gradient-text">Appointment</span>
            </h1>
            <p className="text-xl text-muted-foreground">Schedule your consultation with our expert physiotherapists</p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-primary" />
                    Appointment Details
                  </CardTitle>
                  <CardDescription>Fill in your details and we'll get back to you shortly</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@example.com"
                      />
                    </div>

                    {/* Service Selection */}
                    <div>
                      <Label htmlFor="service">Service Required *</Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) => setFormData({ ...formData, service: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Date and Time */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Preferred Date *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          required
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      <div>
                        <Label htmlFor="time">Preferred Time *</Label>
                        <Select
                          value={formData.time}
                          onValueChange={(value) => setFormData({ ...formData, time: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Concern */}
                    <div>
                      <Label htmlFor="concern">Describe Your Concern</Label>
                      <Textarea
                        id="concern"
                        value={formData.concern}
                        onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                        placeholder="Please describe your symptoms or concerns..."
                        rows={4}
                      />
                    </div>

                    {/* Confirmation Options */}
                    <div className="space-y-3">
                      <Label>Confirmation Preferences:</Label>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="whatsapp"
                          checked={formData.whatsappConfirmation}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, whatsappConfirmation: checked as boolean })
                          }
                        />
                        <Label htmlFor="whatsapp" className="flex items-center cursor-pointer">
                          <MessageSquare className="w-4 h-4 mr-2 text-green-600" />
                          Send appointment details via WhatsApp
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="call"
                          checked={formData.callConfirmation}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, callConfirmation: checked as boolean })
                          }
                        />
                        <Label htmlFor="call" className="flex items-center cursor-pointer">
                          <Phone className="w-4 h-4 mr-2 text-primary" />
                          Call me to confirm appointment
                        </Label>
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Booking Appointment...
                        </>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4 mr-2" />
                          Book Appointment
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sidebar */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-primary" />
                    Quick Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href="tel:+919876543210">
                      <Phone className="w-4 h-4 mr-2" />
                      Call: +91 98765 43210
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-green-50 hover:bg-green-100 border-green-200"
                    asChild
                  >
                    <a
                      href="https://api.whatsapp.com/send?phone=+919876543210&text=Hi! I'd like to book an appointment."
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MessageSquare className="w-4 h-4 mr-2 text-green-600" />
                      WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Clinic Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-primary" />
                    Clinic Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency */}
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-700 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Emergency Care
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-red-600 mb-3">
                    For urgent cases, call us directly for immediate assistance.
                  </p>
                  <Button size="sm" className="w-full bg-red-600 hover:bg-red-700" asChild>
                    <a href="tel:+919876543210">Emergency Call</a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
