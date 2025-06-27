
"use client"

import React from "react"
import { motion } from "framer-motion"
import { X, Calendar, User, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FilterPanelProps {
  filters: {
    dateRange: string
    status: string
    doctor: string
  }
  onFiltersChange: (filters: any) => void
  onClose: () => void
}

export function FilterPanel({ filters, onFiltersChange, onClose }: FilterPanelProps) {
  const updateFilter = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const resetFilters = () => {
    onFiltersChange({
      dateRange: '7d',
      status: 'all',
      doctor: 'all'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              Advanced Filters
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            Filter and refine your dashboard data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Date Range Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date Range
              </label>
              <Select value={filters.dateRange} onValueChange={(value) => updateFilter('dateRange', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 3 months</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Status
              </label>
              <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="no-show">No Show</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Doctor Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                Doctor
              </label>
              <Select value={filters.doctor} onValueChange={(value) => updateFilter('doctor', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Doctors</SelectItem>
                  <SelectItem value="dr-patel">Dr. Patel</SelectItem>
                  <SelectItem value="dr-singh">Dr. Singh</SelectItem>
                  <SelectItem value="dr-sharma">Dr. Sharma</SelectItem>
                  <SelectItem value="dr-kumar">Dr. Kumar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <Button variant="outline" onClick={resetFilters}>
              Reset Filters
            </Button>
            <div className="text-sm text-muted-foreground">
              Filters applied: {Object.values(filters).filter(f => f !== 'all' && f !== '7d').length}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
