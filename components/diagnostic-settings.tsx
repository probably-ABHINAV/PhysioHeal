
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Settings, Mail, Clock, AlertTriangle, CheckCircle, Save } from "lucide-react"

interface DiagnosticSettings {
  autoRetry: {
    enabled: boolean
    maxRetries: number
    retryDelay: number
  }
  emailNotifications: {
    enabled: boolean
    recipients: string[]
    onFailure: boolean
    onWarning: boolean
    dailySummary: boolean
  }
  scheduledDiagnostics: {
    enabled: boolean
    frequency: string
    time: string
    timezone: string
  }
}

export function DiagnosticSettings() {
  const { toast } = useToast()
  const [settings, setSettings] = useState<DiagnosticSettings>({
    autoRetry: {
      enabled: true,
      maxRetries: 3,
      retryDelay: 1000
    },
    emailNotifications: {
      enabled: false,
      recipients: [],
      onFailure: true,
      onWarning: false,
      dailySummary: true
    },
    scheduledDiagnostics: {
      enabled: false,
      frequency: 'daily',
      time: '09:00',
      timezone: 'UTC'
    }
  })

  const [newRecipient, setNewRecipient] = useState('')
  const [showEmailDialog, setShowEmailDialog] = useState(false)
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)

  const handleSaveSettings = async () => {
    try {
      // In a real implementation, you'd save to Supabase or local storage
      localStorage.setItem('diagnostic_settings', JSON.stringify(settings))
      
      toast({
        title: "Settings Saved",
        description: "Diagnostic settings have been updated successfully",
      })
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save diagnostic settings",
        variant: "destructive"
      })
    }
  }

  const addEmailRecipient = () => {
    if (newRecipient && !settings.emailNotifications.recipients.includes(newRecipient)) {
      setSettings(prev => ({
        ...prev,
        emailNotifications: {
          ...prev.emailNotifications,
          recipients: [...prev.emailNotifications.recipients, newRecipient]
        }
      }))
      setNewRecipient('')
    }
  }

  const removeEmailRecipient = (email: string) => {
    setSettings(prev => ({
      ...prev,
      emailNotifications: {
        ...prev.emailNotifications,
        recipients: prev.emailNotifications.recipients.filter(r => r !== email)
      }
    }))
  }

  return (
    <div className="space-y-6">
      {/* Auto-retry Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <span>Auto-retry Failed Tests</span>
          </CardTitle>
          <CardDescription>
            Automatically retry failed tests up to a specified number of times
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-retry">Enable auto-retry</Label>
            <Switch
              id="auto-retry"
              checked={settings.autoRetry.enabled}
              onCheckedChange={(checked) =>
                setSettings(prev => ({
                  ...prev,
                  autoRetry: { ...prev.autoRetry, enabled: checked }
                }))
              }
            />
          </div>

          {settings.autoRetry.enabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-3"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="max-retries">Max retries</Label>
                  <Input
                    id="max-retries"
                    type="number"
                    min="1"
                    max="10"
                    value={settings.autoRetry.maxRetries}
                    onChange={(e) =>
                      setSettings(prev => ({
                        ...prev,
                        autoRetry: { ...prev.autoRetry, maxRetries: parseInt(e.target.value) || 3 }
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="retry-delay">Delay (seconds)</Label>
                  <Input
                    id="retry-delay"
                    type="number"
                    min="1"
                    max="60"
                    value={settings.autoRetry.retryDelay / 1000}
                    onChange={(e) =>
                      setSettings(prev => ({
                        ...prev,
                        autoRetry: { ...prev.autoRetry, retryDelay: (parseInt(e.target.value) || 1) * 1000 }
                      }))
                    }
                  />
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-blue-500" />
            <span>Email Notifications</span>
          </CardTitle>
          <CardDescription>
            Send email alerts when tests fail or warnings occur
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Enable email notifications</Label>
            <Switch
              id="email-notifications"
              checked={settings.emailNotifications.enabled}
              onCheckedChange={(checked) =>
                setSettings(prev => ({
                  ...prev,
                  emailNotifications: { ...prev.emailNotifications, enabled: checked }
                }))
              }
            />
          </div>

          {settings.emailNotifications.enabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-4"
            >
              <div>
                <Label>Email Recipients</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {settings.emailNotifications.recipients.map((email) => (
                    <Badge
                      key={email}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => removeEmailRecipient(email)}
                    >
                      {email} ×
                    </Badge>
                  ))}
                </div>
                <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Mail className="h-4 w-4 mr-2" />
                      Add Recipient
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Email Recipient</DialogTitle>
                      <DialogDescription>
                        Enter an email address to receive diagnostic notifications
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        type="email"
                        placeholder="admin@example.com"
                        value={newRecipient}
                        onChange={(e) => setNewRecipient(e.target.value)}
                      />
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setShowEmailDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          addEmailRecipient()
                          setShowEmailDialog(false)
                        }}>
                          Add
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notify-failure">Notify on failures</Label>
                  <Switch
                    id="notify-failure"
                    checked={settings.emailNotifications.onFailure}
                    onCheckedChange={(checked) =>
                      setSettings(prev => ({
                        ...prev,
                        emailNotifications: { ...prev.emailNotifications, onFailure: checked }
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notify-warning">Notify on warnings</Label>
                  <Switch
                    id="notify-warning"
                    checked={settings.emailNotifications.onWarning}
                    onCheckedChange={(checked) =>
                      setSettings(prev => ({
                        ...prev,
                        emailNotifications: { ...prev.emailNotifications, onWarning: checked }
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="daily-summary">Daily summary</Label>
                  <Switch
                    id="daily-summary"
                    checked={settings.emailNotifications.dailySummary}
                    onCheckedChange={(checked) =>
                      setSettings(prev => ({
                        ...prev,
                        emailNotifications: { ...prev.emailNotifications, dailySummary: checked }
                      }))
                    }
                  />
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Scheduled Diagnostics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-green-500" />
            <span>Scheduled Diagnostics</span>
          </CardTitle>
          <CardDescription>
            Run diagnostics automatically at regular intervals
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="scheduled-diagnostics">Enable scheduled runs</Label>
            <Switch
              id="scheduled-diagnostics"
              checked={settings.scheduledDiagnostics.enabled}
              onCheckedChange={(checked) =>
                setSettings(prev => ({
                  ...prev,
                  scheduledDiagnostics: { ...prev.scheduledDiagnostics, enabled: checked }
                }))
              }
            />
          </div>

          {settings.scheduledDiagnostics.enabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select
                    value={settings.scheduledDiagnostics.frequency}
                    onValueChange={(value) =>
                      setSettings(prev => ({
                        ...prev,
                        scheduledDiagnostics: { ...prev.scheduledDiagnostics, frequency: value }
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Every Hour</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={settings.scheduledDiagnostics.time}
                    onChange={(e) =>
                      setSettings(prev => ({
                        ...prev,
                        scheduledDiagnostics: { ...prev.scheduledDiagnostics, time: e.target.value }
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={settings.scheduledDiagnostics.timezone}
                    onValueChange={(value) =>
                      setSettings(prev => ({
                        ...prev,
                        scheduledDiagnostics: { ...prev.scheduledDiagnostics, timezone: value }
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="Europe/London">London</SelectItem>
                      <SelectItem value="Europe/Berlin">Berlin</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                      <SelectItem value="Asia/Shanghai">Shanghai</SelectItem>
                      <SelectItem value="Australia/Sydney">Sydney</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Scheduled for:</h4>
                    <p className="text-sm text-blue-700">
                      {settings.scheduledDiagnostics.frequency.charAt(0).toUpperCase() + 
                       settings.scheduledDiagnostics.frequency.slice(1)} at{' '}
                      {settings.scheduledDiagnostics.time} ({settings.scheduledDiagnostics.timezone})
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Save Settings</span>
        </Button>
      </div>
    </div>
  )
}
