"use client"

import React from "react"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WhatsAppCTAProps {
  phone: string
  name: string
  message?: string
}

export function WhatsAppCTA({ phone, name, message }: WhatsAppCTAProps) {
  const defaultMessage = `Hi ${name}, this is a reminder about your physiotherapy appointment. Please confirm your availability or let us know if you need to reschedule.`

  const whatsappMessage = message || defaultMessage

  const cleanPhone = phone.replace(/[^\d+]/g, '')

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleWhatsAppClick}
      className="flex items-center gap-2 text-green-600 border-green-200 hover:bg-green-50"
    >
      <MessageCircle className="h-4 w-4" />
      <span className="hidden sm:inline">WhatsApp</span>
    </Button>
  )
}