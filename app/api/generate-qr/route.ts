import { NextResponse } from "next/server"
import QRCode from "qrcode"

export async function POST(request: Request) {
  try {
    const { vcard } = await request.json()

    const qrCodeDataUrl = await QRCode.toDataURL(vcard, {
      errorCorrectionLevel: "M",
      type: "image/png",
      width: 512,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    })

    return NextResponse.json({ qrCode: qrCodeDataUrl })
  } catch (error) {
    console.error("[v0] Error generating QR code:", error)
    return NextResponse.json({ error: "Failed to generate QR code" }, { status: 500 })
  }
}
