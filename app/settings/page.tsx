"use client"

import type React from "react"

import { useState } from "react"
import { DigitalClock } from "@/components/digital-clock"
import { DynamicSidebar } from "@/components/dynamic-sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { Home, BookOpen, Settings, LogIn, FileQuestion, Users, Info } from "lucide-react"
import { FloatingDock } from "@/components/ui/floating-dock"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("account")
  
  const dockItems = [
    { title: "Home", icon: <Home className="h-full w-full text-neutral-300" />, href: "/" },
    { title: "Experiments", icon: <BookOpen className="h-full w-full text-neutral-300" />, href: "/experiments" },
    { title: "Quizzes", icon: <FileQuestion className="h-full w-full text-neutral-300" />, href: "/quizzes" },
    { title: "Team", icon: <Users className="h-full w-full text-neutral-300" />, href: "/team" },
    { title: "About", icon: <Info className="h-full w-full text-neutral-300" />, href: "/about" },
    { title: "Settings", icon: <Settings className="h-full w-full text-neutral-300" />, href: "/settings" },
    { title: "Sign Up", icon: <LogIn className="h-full w-full text-neutral-300" />, href: "/signup" },
  ]

  // Account settings
  const [accountSettings, setAccountSettings] = useState({
    name: "Student User",
    email: "student@example.com",
    bio: "Electrical Engineering student at SRM University",
  })

  // Appearance settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    darkMode: true,
    highContrast: false,
    fontSize: 16,
    animationsEnabled: true,
  })

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    experimentUpdates: true,
    newExperiments: true,
    quizReminders: false,
  })

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    shareProgress: true,
    publicProfile: false,
    dataCollection: true,
  })

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setAccountSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleAppearanceChange = (key: string, value: boolean | number) => {
    setAppearanceSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacySettings((prev) => ({ ...prev, [key]: value }))
  }

  const saveSettings = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Save settings to localStorage for demo purposes
      localStorage.setItem("accountSettings", JSON.stringify(accountSettings))
      localStorage.setItem("appearanceSettings", JSON.stringify(appearanceSettings))
      localStorage.setItem("notificationSettings", JSON.stringify(notificationSettings))
      localStorage.setItem("privacySettings", JSON.stringify(privacySettings))

      toast.success("Settings saved successfully!")
    } catch (error) {
      toast.error("Failed to save settings")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Dynamic Sidebar */}
      <DynamicSidebar />
      
      {/* Centered navigation at the top */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <FloatingDock items={dockItems} className="w-auto" mobileClassName="w-auto" />
      </div>

      <div className="absolute top-4 left-20 md:left-48 z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center"
        >
          <div className="h-10 bg-white text-blue-800 font-bold px-3 py-1 rounded">SRM EEE</div>
        </motion.div>
      </div>

      <DigitalClock />

      <div className="w-full max-w-6xl mx-auto px-4 py-8 pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold mb-8">Settings</h1>

          <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 bg-neutral-900 border border-neutral-800">
              <TabsTrigger value="account" className="data-[state=active]:bg-blue-900/30 text-white">
                Account
              </TabsTrigger>
              <TabsTrigger value="appearance" className="data-[state=active]:bg-blue-900/30 text-white">
                Appearance
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-blue-900/30 text-white">
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="data-[state=active]:bg-blue-900/30 text-white">
                Privacy
              </TabsTrigger>
            </TabsList>

            {/* Account Settings */}
            <TabsContent value="account" className="mt-6">
              <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
                <h2 className="text-xl font-semibold mb-6">Account Settings</h2>

                <div className="space-y-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={accountSettings.name}
                      onChange={handleAccountChange}
                      className="bg-neutral-800 border-neutral-700"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={accountSettings.email}
                      onChange={handleAccountChange}
                      className="bg-neutral-800 border-neutral-700"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={accountSettings.bio}
                      onChange={handleAccountChange}
                      rows={4}
                      className="bg-neutral-800 border border-neutral-700 rounded-md p-2 text-white resize-none"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Appearance Settings */}
            <TabsContent value="appearance" className="mt-6">
              <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
                <h2 className="text-xl font-semibold mb-6">Appearance Settings</h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="darkMode" className="text-base">
                        Dark Mode
                      </Label>
                      <p className="text-sm text-neutral-400">Enable dark theme for the application</p>
                    </div>
                    <Switch
                      id="darkMode"
                      checked={appearanceSettings.darkMode}
                      onCheckedChange={(checked) => handleAppearanceChange("darkMode", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="highContrast" className="text-base">
                        High Contrast
                      </Label>
                      <p className="text-sm text-neutral-400">Increase contrast for better visibility</p>
                    </div>
                    <Switch
                      id="highContrast"
                      checked={appearanceSettings.highContrast}
                      onCheckedChange={(checked) => handleAppearanceChange("highContrast", checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="fontSize" className="text-base">
                        Font Size
                      </Label>
                      <span className="text-sm text-neutral-400">{appearanceSettings.fontSize}px</span>
                    </div>
                    <Slider
                      id="fontSize"
                      min={12}
                      max={24}
                      step={1}
                      value={[appearanceSettings.fontSize]}
                      onValueChange={(value) => handleAppearanceChange("fontSize", value[0])}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="animationsEnabled" className="text-base">
                        Animations
                      </Label>
                      <p className="text-sm text-neutral-400">Enable animations throughout the application</p>
                    </div>
                    <Switch
                      id="animationsEnabled"
                      checked={appearanceSettings.animationsEnabled}
                      onCheckedChange={(checked) => handleAppearanceChange("animationsEnabled", checked)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications" className="mt-6">
              <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
                <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications" className="text-base">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-neutral-400">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="experimentUpdates" className="text-base">
                        Experiment Updates
                      </Label>
                      <p className="text-sm text-neutral-400">Get notified about updates to experiments</p>
                    </div>
                    <Switch
                      id="experimentUpdates"
                      checked={notificationSettings.experimentUpdates}
                      onCheckedChange={(checked) => handleNotificationChange("experimentUpdates", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="newExperiments" className="text-base">
                        New Experiments
                      </Label>
                      <p className="text-sm text-neutral-400">Get notified when new experiments are added</p>
                    </div>
                    <Switch
                      id="newExperiments"
                      checked={notificationSettings.newExperiments}
                      onCheckedChange={(checked) => handleNotificationChange("newExperiments", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="quizReminders" className="text-base">
                        Quiz Reminders
                      </Label>
                      <p className="text-sm text-neutral-400">Receive reminders about upcoming quizzes</p>
                    </div>
                    <Switch
                      id="quizReminders"
                      checked={notificationSettings.quizReminders}
                      onCheckedChange={(checked) => handleNotificationChange("quizReminders", checked)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Privacy Settings */}
            <TabsContent value="privacy" className="mt-6">
              <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
                <h2 className="text-xl font-semibold mb-6">Privacy Settings</h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="shareProgress" className="text-base">
                        Share Progress
                      </Label>
                      <p className="text-sm text-neutral-400">Allow instructors to view your experiment progress</p>
                    </div>
                    <Switch
                      id="shareProgress"
                      checked={privacySettings.shareProgress}
                      onCheckedChange={(checked) => handlePrivacyChange("shareProgress", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="publicProfile" className="text-base">
                        Public Profile
                      </Label>
                      <p className="text-sm text-neutral-400">Make your profile visible to other students</p>
                    </div>
                    <Switch
                      id="publicProfile"
                      checked={privacySettings.publicProfile}
                      onCheckedChange={(checked) => handlePrivacyChange("publicProfile", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="dataCollection" className="text-base">
                        Data Collection
                      </Label>
                      <p className="text-sm text-neutral-400">
                        Allow anonymous usage data collection to improve the platform
                      </p>
                    </div>
                    <Switch
                      id="dataCollection"
                      checked={privacySettings.dataCollection}
                      onCheckedChange={(checked) => handlePrivacyChange("dataCollection", checked)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex justify-end">
            <Button onClick={saveSettings} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
              {isLoading ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

