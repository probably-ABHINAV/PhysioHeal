"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, AlertCircle } from 'lucide-react'

export function SymptomsChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [recommendation, setRecommendation] = useState<string | null>(null)

  const symptoms = [
    { id: 'back-pain', label: 'Back Pain', category: 'pain' },
    { id: 'neck-pain', label: 'Neck Pain', category: 'pain' },
    { id: 'knee-pain', label: 'Knee Pain', category: 'joint' },
    { id: 'shoulder-pain', label: 'Shoulder Pain', category: 'joint' },
    { id: 'muscle-stiffness', label: 'Muscle Stiffness', category: 'mobility' },
    { id: 'limited-movement', label: 'Limited Movement', category: 'mobility' },
    { id: 'sports-injury', label: 'Sports Injury', category: 'injury' },
    { id: 'post-surgery', label: 'Post-Surgery Recovery', category: 'recovery' }
  ]

  const getRecommendation = (symptoms: string[]) => {
    if (symptoms.includes('back-pain') || symptoms.includes('neck-pain')) {
      return 'Our Spine Therapy Program would be ideal for you. Book a consultation for specialized back and neck pain treatment.'
    }
    if (symptoms.includes('sports-injury')) {
      return 'Our Sports Rehabilitation Program can help you recover faster and prevent future injuries.'
    }
    if (symptoms.includes('knee-pain') || symptoms.includes('shoulder-pain')) {
      return 'Joint Pain Management therapy will help relieve your pain and restore mobility.'
    }
    return 'Based on your symptoms, we recommend starting with a comprehensive assessment to create your personalized treatment plan.'
  }

  const toggleSymptom = (symptomId: string) => {
    const updated = selectedSymptoms.includes(symptomId)
      ? selectedSymptoms.filter(id => id !== symptomId)
      : [...selectedSymptoms, symptomId]

    setSelectedSymptoms(updated)
    if (updated.length > 0) {
      setRecommendation(getRecommendation(updated))
    } else {
      setRecommendation(null)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Not Sure What Treatment You Need?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Select your symptoms below and get personalized treatment recommendations
          </p>
        </motion.div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              What symptoms are you experiencing?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {symptoms.map((symptom) => (
                <Badge
                  key={symptom.id}
                  variant={selectedSymptoms.includes(symptom.id) ? "default" : "outline"}
                  className={`cursor-pointer p-3 text-center transition-all ${
                    selectedSymptoms.includes(symptom.id) 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'hover:bg-blue-50'
                  }`}
                  onClick={() => toggleSymptom(symptom.id)}
                >
                  {symptom.label}
                </Badge>
              ))}
            </div>

            {recommendation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4"
              >
                <h3 className="font-semibold text-green-800 mb-2">Recommended for you:</h3>
                <p className="text-green-700 mb-4">{recommendation}</p>
                <Button className="bg-green-600 hover:bg-green-700" asChild>
                  <a href="/book-appointment">
                    Book FREE Consultation <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}