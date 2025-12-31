"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Download, QrCode, CheckCircle2 } from "lucide-react"

export function VCardGenerator() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    company: "",
    jobTitle: "",
    website: "",
  })
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const generateVCard = () => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${formData.firstName} ${formData.lastName}`,
      `N:${formData.lastName};${formData.firstName};;;`,
      formData.phone && `TEL:${formData.phone}`,
      formData.email && `EMAIL:${formData.email}`,
      formData.company && `ORG:${formData.company}`,
      formData.jobTitle && `TITLE:${formData.jobTitle}`,
      formData.website && `URL:${formData.website}`,
      "END:VCARD",
    ]
      .filter(Boolean)
      .join("\n")

    return vcard
  }

  const handleGenerateQR = async () => {
    if (!formData.firstName && !formData.lastName) {
      return
    }

    setIsGenerating(true)

    try {
      const vcard = generateVCard()
      const response = await fetch("/api/generate-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vcard }),
      })

      const data = await response.json()
      setQrCodeUrl(data.qrCode)
    } catch (error) {
      console.error("[v0] Error generating QR code:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (!qrCodeUrl) return

    const link = document.createElement("a")
    link.href = qrCodeUrl
    link.download = `vcard-qr-${formData.firstName}-${formData.lastName}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-20 lg:py-24 max-w-5xl">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance leading-tight">
          Free vCard QR Code Generator
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Create a QR code for your contact information. When scanned, your vCard is automatically saved to the person's phone. Perfect for business cards, resumes, and networking.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
          <CheckCircle2 className="h-4 w-4" />
          No Sign Up Required
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
          <CheckCircle2 className="h-4 w-4" />
          100% Free
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
          <CheckCircle2 className="h-4 w-4" />
          Instant Download
        </div>
      </div>

      <Card className="p-8 md:p-10 mb-8 shadow-lg border-border/50">
        <h2 className="text-2xl font-semibold mb-6 tracking-tight">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-2.5">
            <Label htmlFor="firstName" className="text-sm font-medium">
              First Name *
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="John"
              className="h-11"
            />
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="lastName" className="text-sm font-medium">
              Last Name *
            </Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Doe"
              className="h-11"
            />
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+1 (555) 123-4567"
              className="h-11"
            />
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john.doe@company.com"
              className="h-11"
            />
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="company" className="text-sm font-medium">
              Company
            </Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Acme Corporation"
              className="h-11"
            />
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="jobTitle" className="text-sm font-medium">
              Job Title
            </Label>
            <Input
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              placeholder="Senior Product Manager"
              className="h-11"
            />
          </div>

          <div className="space-y-2.5 md:col-span-2">
            <Label htmlFor="website" className="text-sm font-medium">
              Website
            </Label>
            <Input
              id="website"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="https://www.company.com"
              className="h-11"
            />
          </div>
        </div>

        <Button
          onClick={handleGenerateQR}
          className="w-full h-12 text-base font-medium"
          size="lg"
          disabled={isGenerating || (!formData.firstName && !formData.lastName)}
        >
          <QrCode className="mr-2 h-5 w-5" />
          {isGenerating ? "Generating QR Code..." : "Generate QR Code"}
        </Button>
      </Card>

      {qrCodeUrl && (
        <Card className="p-10 shadow-lg border-border/50">
          <div className="flex flex-col items-center space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2">Your QR Code is Ready</h3>
              <p className="text-muted-foreground">Scan or download to share your contact information</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/30">
              <img src={qrCodeUrl || "/placeholder.svg"} alt="vCard QR Code" className="w-72 h-72" />
            </div>

            <Button onClick={handleDownload} size="lg" variant="default" className="h-12 px-8 text-base font-medium">
              <Download className="mr-2 h-5 w-5" />
              Download QR Code
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
