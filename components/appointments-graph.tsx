"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts'
import { TrendingUp, BarChart3, CalendarDays } from "lucide-react"

interface AppointmentsGraphProps {
  data?: any[]
}

export function AppointmentsGraph({ data = [] }: AppointmentsGraphProps) {
  // Sample data if none provided
  const sampleData = [
    { date: '2024-01-01', appointments: 12, completed: 10, cancelled: 2 },
    { date: '2024-01-02', appointments: 15, completed: 13, cancelled: 2 },
    { date: '2024-01-03', appointments: 8, completed: 7, cancelled: 1 },
    { date: '2024-01-04', appointments: 18, completed: 16, cancelled: 2 },
    { date: '2024-01-05', appointments: 22, completed: 20, cancelled: 2 },
    { date: '2024-01-06', appointments: 14, completed: 12, cancelled: 2 },
    { date: '2024-01-07', appointments: 16, completed: 15, cancelled: 1 },
  ]

  const chartData = data.length > 0 ? data : sampleData

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{`Date: ${new Date(label).toLocaleDateString()}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-blue-600" />
            Booking Analytics
          </CardTitle>
          <CardDescription>
            Daily appointment trends over the last 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="appointmentsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  className="text-xs"
                />
                <YAxis className="text-xs" />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="appointments"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fill="url(#appointmentsGradient)"
                  name="Total Appointments"
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke="#10B981"
                  strokeWidth={2}
                  fill="url(#completedGradient)"
                  name="Completed"
                />
                <Line
                  type="monotone"
                  dataKey="cancelled"
                  stroke="#EF4444"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Cancelled"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-sm font-medium">Total</span>
              </div>
              <p className="text-lg font-bold text-blue-600">
                {chartData.reduce((sum, item) => sum + item.appointments, 0)}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm font-medium">Completed</span>
              </div>
              <p className="text-lg font-bold text-green-600">
                {chartData.reduce((sum, item) => sum + item.completed, 0)}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-sm font-medium">Cancelled</span>
              </div>
              <p className="text-lg font-bold text-red-600">
                {chartData.reduce((sum, item) => sum + item.cancelled, 0)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}