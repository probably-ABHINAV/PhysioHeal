
'use client'

import Script from 'next/script'
import { useEffect } from 'react'

declare global {
  interface Window {
    gtag: any
  }
}

export function Analytics() {
  useEffect(() => {
    // Track page views
    const trackPageView = () => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', 'GA_MEASUREMENT_ID', {
          page_title: document.title,
          page_location: window.location.href,
        })
      }
    }

    // Track Indian user specific events
    const trackIndianUserEvents = () => {
      // Track language preference
      const language = localStorage.getItem('preferred-language') || 'en'
      window.gtag?.('event', 'language_preference', {
        event_category: 'user_preference',
        event_label: language,
        value: language === 'hi' ? 1 : 0
      })

      // Track device type (important for Indian mobile-first users)
      const isMobile = window.innerWidth <= 768
      window.gtag?.('event', 'device_type', {
        event_category: 'user_device',
        event_label: isMobile ? 'mobile' : 'desktop',
        value: isMobile ? 1 : 0
      })
    }

    trackPageView()
    trackIndianUserEvents()

    // Track WhatsApp clicks
    const whatsappButtons = document.querySelectorAll('[data-track="whatsapp"]')
    whatsappButtons.forEach(button => {
      button.addEventListener('click', () => {
        window.gtag?.('event', 'whatsapp_click', {
          event_category: 'contact',
          event_label: 'whatsapp_booking',
          value: 1
        })
      })
    })

    // Track phone calls
    const phoneButtons = document.querySelectorAll('[data-track="phone"]')
    phoneButtons.forEach(button => {
      button.addEventListener('click', () => {
        window.gtag?.('event', 'phone_click', {
          event_category: 'contact',
          event_label: 'phone_booking',
          value: 1
        })
      })
    })

  }, [])

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: document.title,
            page_location: window.location.href,
            custom_map: {
              'custom_dimension_1': 'user_language',
              'custom_dimension_2': 'booking_method'
            }
          });
        `}
      </Script>
    </>
  )
}
