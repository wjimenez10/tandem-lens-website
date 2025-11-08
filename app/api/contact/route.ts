import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, company, message } = await request.json()

    // Validar los datos
    if (!name || !email || !company || !message) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY

    if (!RESEND_API_KEY) {
      console.error("[v0] RESEND_API_KEY no está configurada")
      return NextResponse.json({ error: "Configuración del servidor incompleta" }, { status: 500 })
    }

    // Enviar email usando Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Tandem Lens Contact Form <noreply@tandemlens.net>",
        to: process.env.CONTACT_EMAIL || "info@tandemlens.net",
        subject: `Nuevo mensaje de contacto de ${name} - ${company}`,
        html: `
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Empresa:</strong> ${company}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
        reply_to: email,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("[v0] Error de Resend:", error)
      return NextResponse.json({ error: "Error al enviar el email" }, { status: 500 })
    }

    const data = await response.json()
    console.log("[v0] Email enviado exitosamente:", data.id)

    return NextResponse.json({ success: true, message: "Email enviado exitosamente" }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error en el endpoint de contacto:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
