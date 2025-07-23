
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { id, review_text } = await req.json()
    
    if (!id || !review_text) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createClient()

    // 1️⃣ Run sentiment check with GPT
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a healthcare review moderator. Classify patient reviews as Positive, Neutral, or Negative based on sentiment and appropriateness for public display. Consider medical professionalism standards.'
        },
        {
          role: 'user',
          content: `Classify this patient review as Positive, Neutral, or Negative:\n\n"${review_text}"`,
        },
      ],
      max_tokens: 10,
      temperature: 0.1,
    })

    const sentiment = completion.choices[0].message.content?.trim() || 'Neutral'
    const approved = sentiment === 'Positive'

    // 2️⃣ Update review row with AI result
    const { error: updateError } = await supabase
      .from('reviews')
      .update({ 
        approved,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)

    if (updateError) {
      console.error('Error updating review:', updateError)
      return NextResponse.json({ success: false, error: updateError.message }, { status: 500 })
    }

    // 3️⃣ If flagged, create alert row
    if (!approved) {
      const { error: alertError } = await supabase
        .from('review_alerts')
        .insert([{ 
          review_id: id, 
          sentiment,
          created_at: new Date().toISOString()
        }])
      
      if (alertError) {
        console.error('Error creating alert:', alertError)
        // Don't fail the request if alert creation fails
      }
    }

    return NextResponse.json({ 
      success: true, 
      sentiment, 
      approved,
      message: approved ? 'Review auto-approved' : 'Review flagged for manual review'
    })

  } catch (error) {
    console.error('Error in moderate-review API:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
