
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { Calendar, Phone, User, MessageSquare, Clock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase"

const consultationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  reason: z.string().min(10, "Please describe your reason in at least 10 characters"),
  preferred_time: z.string().min(1, "Please select your preferred time"),
})

type ConsultationFormData = z.infer<typeof consultationSchema>

export function ConsultationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
  })

  const onSubmit = async (data: ConsultationFormData) => {
    setIsSubmitting(true)
    
    try {
      const { error } = await supabase.from('appointments').insert({
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        reason: data.reason,
        preferred_time: data.preferred_time,
        status: 'pending',
      })

      if (error) {
        throw error
      }

      setIsSuccess(true)
      reset()
      
      toast({
        title: "Appointment Booked Successfully!",
        description: "We'll contact you soon to confirm your appointment.",
      })

      // WhatsApp prefill link
      const whatsappMessage = encodeURIComponent(
        `Hi! I've just booked a consultation appointment. My name is ${data.name} and my preferred time is ${data.preferred_time}. Reason: ${data.reason}`
      )
      const whatsappUrl = `https://wa.me/917979855427?text=${whatsappMessage}`
      
      setTimeout(() => {
        window.open(whatsappUrl, '_blank')
      }, 2000)

    } catch (error) {
      console.error('Error booking appointment:', error)
      toast({
        title: "Booking Failed",
        description: "There was an error booking your appointment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 bg-green-50 rounded-2xl border border-green-200"
      >
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-800 mb-2">Appointment Booked!</h3>
        <p className="text-green-600 mb-4">We'll contact you soon to confirm your appointment.</p>
        <p className="text-sm text-green-500">Redirecting to WhatsApp...</p>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-md mx-auto"
    >
      <div className="space-y-2">
        <Label htmlFor="name" className="flex items-center gap-2">
          <User className="w-4 h-4" />
          Full Name
        </Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Enter your full name"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          Phone Number
        </Label>
        <Input
          id="phone"
          {...register("phone")}
          placeholder="Enter your phone number"
          className={errors.phone ? "border-red-500" : ""}
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Email (Optional)
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="Enter your email address"
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason" className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Reason for Consultation
        </Label>
        <Textarea
          id="reason"
          {...register("reason")}
          placeholder="Describe your symptoms or reason for consultation"
          rows={4}
          className={errors.reason ? "border-red-500" : ""}
        />
        {errors.reason && (
          <p className="text-sm text-red-500">{errors.reason.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="preferred_time" className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Preferred Time
        </Label>
        <Input
          id="preferred_time"
          type="datetime-local"
          {...register("preferred_time")}
          min={new Date().toISOString().slice(0, 16)}
          className={errors.preferred_time ? "border-red-500" : ""}
        />
        {errors.preferred_time && (
          <p className="text-sm text-red-500">{errors.preferred_time.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
        size="lg"
      >
        {isSubmitting ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
          />
        ) : (
          <>
            <Calendar className="w-5 h-5 mr-2" />
            Book Consultation
          </>
        )}
      </Button>
    </motion.form>
  )
}
