import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Zap, 
  Shield, 
  Users, 
  Clock, 
  Award,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const services = [
  {
    title: "Sports Injury Rehabilitation",
    description: "Comprehensive treatment for athletic injuries and performance optimization.",
    features: ["Injury Assessment", "Recovery Planning", "Performance Enhancement", "Injury Prevention"],
    icon: Zap,
    color: "text-blue-600"
  },
  {
    title: "Manual Therapy",
    description: "Hands-on treatment techniques for pain relief and mobility improvement.",
    features: ["Joint Mobilization", "Soft Tissue Massage", "Trigger Point Therapy", "Myofascial Release"],
    icon: Heart,
    color: "text-red-600"
  },
  {
    title: "Post-Surgery Rehabilitation",
    description: "Specialized care to help you recover safely and effectively after surgery.",
    features: ["Post-Op Assessment", "Gradual Strengthening", "Scar Tissue Management", "Functional Training"],
    icon: Shield,
    color: "text-green-600"
  },
  {
    title: "Chronic Pain Management",
    description: "Long-term strategies for managing persistent pain conditions.",
    features: ["Pain Education", "Movement Therapy", "Lifestyle Modification", "Stress Management"],
    icon: Users,
    color: "text-purple-600"
  }
];

export default function ServicesPage() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive physiotherapy services tailored to your specific needs and recovery goals.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <service.icon className={`h-8 w-8 ${service.color}`} />
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant="outline">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center bg-primary/5 rounded-lg p-8"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Recovery?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Book a consultation today and take the first step towards a pain-free life.
          </p>
          <Button size="lg" className="mr-4">
            Book Consultation
          </Button>
          <Button size="lg" variant="outline">
            Contact Us
          </Button>
        </motion.div>
      </div>
    </div>
  );
}