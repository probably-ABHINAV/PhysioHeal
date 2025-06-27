
"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export function useRealtime(tables: string[], onUpdate?: () => void) {
  const [isConnected, setIsConnected] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  
  const supabase = createClientComponentClient()

  useEffect(() => {
    const channels: any[] = []

    tables.forEach(table => {
      const channel = supabase
        .channel(`realtime:${table}`)
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: table 
          }, 
          (payload) => {
            console.log(`Realtime update on ${table}:`, payload)
            setLastUpdate(new Date())
            if (onUpdate) onUpdate()
          }
        )
        .subscribe((status) => {
          console.log(`Realtime subscription status for ${table}:`, status)
          setIsConnected(status === 'SUBSCRIBED')
        })

      channels.push(channel)
    })

    return () => {
      channels.forEach(channel => {
        supabase.removeChannel(channel)
      })
    }
  }, [tables])

  return { isConnected, lastUpdate }
}
