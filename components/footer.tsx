
"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin,
  Heart,
  Shield,
  FileText,
  Eye
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Book Appointment", href: "/book-appointment" },
    { name: "Contact", href: "/contact" },
    { name: "Reviews", href: "/reviews" }
  ]

  const services = [
    "Sports Physiotherapy",
    "Manual Therapy", 
    "Dry Needling",
    "Exercise Rehabilitation",
    "Pain Management",
    "Post Surgery Recovery"
  ]

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy", icon: Shield },
    { name: "Terms & Conditions", href: "/terms", icon: FileText },
    { name: "Accessibility", href: "/accessibility", icon: Eye }
  ]

  const socialLinks = [
    { name: "Facebook", href: "#", icon: Facebook, color: "hover:text-blue-600" },
    { name: "Instagram", href: "#", icon: Instagram, color: "hover:text-pink-600" },
    { name: "Twitter", href: "#", icon: Twitter, color: "hover:text-blue-400" },
    { name: "LinkedIn", href: "#", icon: Linkedin, color: "hover:text-blue-700" }
  ]

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.3),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,rgba(120,119,198,0.1)_50%,transparent_60%)]" />
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Left Column - Contact & Map */}
            <div className="space-y-8">
              {/* Brand & Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Heart className="h-6 w-6 text-blue-400 mr-2" />
                  PhysioHeal Clinic
                </h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Your trusted partner in recovery and wellness. We provide personalized physiotherapy 
                  treatments to help you get back to doing what you love.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium">Visit Our Clinic</p>
                      <p className="text-slate-300 text-sm">123 Wellness Street, Health City, HC 12345</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                      <Phone className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-slate-300 text-sm">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium">Email Us</p>
                      <p className="text-slate-300 text-sm">info@physioheal.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center">
                      <Clock className="h-5 w-5 text-orange-400" />
                    </div>
                    <div>
                      <p className="font-medium">Opening Hours</p>
                      <p className="text-slate-300 text-sm">Mon-Fri: 8AM-6PM, Sat: 9AM-4PM</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Google Maps Embed */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
                  <div className="aspect-video bg-slate-700 flex items-center justify-center">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.123456789!2d-74.006!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjEiTiA3NMKwMDAnMjEuNiJX!5e0!3m2!1sen!2sus!4v1234567890123"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                    />
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Right Column - Links & Services */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-slate-300 hover:text-white transition-colors flex items-center group"
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300 mr-0 group-hover:mr-2" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h4 className="text-lg font-semibold mb-6">Our Services</h4>
                <ul className="space-y-3">
                  {services.map((service) => (
                    <li key={service}>
                      <span className="text-slate-300 hover:text-white transition-colors flex items-center group cursor-pointer">
                        <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all duration-300 mr-0 group-hover:mr-2" />
                        {service}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl p-8 mb-12 backdrop-blur-sm border border-blue-500/20"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Recovery Journey?</h3>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Book your consultation today and take the first step towards a pain-free, active lifestyle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  onClick={() => window.location.href = '/book-appointment'}
                >
                  Book Appointment
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={() => window.location.href = '/contact'}
                >
                  Get In Touch
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Social Links & Legal */}
          <div className="border-t border-slate-700 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center space-x-4"
              >
                <span className="text-slate-300 text-sm">Follow us:</span>
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className={`w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 transition-colors ${social.color}`}
                      aria-label={social.name}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  )
                })}
              </motion.div>

              {/* Legal Links */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap items-center space-x-6"
              >
                {legalLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-slate-300 hover:text-white transition-colors flex items-center space-x-1 text-sm"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{link.name}</span>
                    </a>
                  )
                })}
              </motion.div>
            </div>

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-center mt-8 pt-8 border-t border-slate-800"
            >
              <p className="text-slate-400 text-sm">
                © {new Date().getFullYear()} PhysioHeal Clinic. All rights reserved. |{" "}
                <span className="text-slate-300">Designed with ❤️ for your wellness</span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}
