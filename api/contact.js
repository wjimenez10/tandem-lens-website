// api/contact.js
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, company, message, language } = JSON.parse(req.body || '{}');

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 📧 Configuración SMTP usando variables seguras de entorno
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 📥 Correo interno para Tandem Lens
    const internalMail = {
      from: `"Tandem Lens Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      subject: `Nuevo mensaje de ${name} (${company || 'Sin empresa'})`,
      text: `
Nuevo contacto recibido desde el sitio web Tandem Lens:

Nombre: ${name}
Email: ${email}
Empresa: ${company || '-'}
Mensaje:
${message}

Idioma del formulario: ${language || 'desconocido'}
      `,
    };

    await transporter.sendMail(internalMail);

    // 🌐 Mensaje automático al usuario
    const isSpanish = language && language.toLowerCase().startsWith('es');
    const autoReply = {
      from: `"Tandem Lens" <${process.env.SMTP_USER}>`,
      to: email,
      subject: isSpanish
        ? 'Hemos recibido tu mensaje'
        : 'We have received your message',
      text: isSpanish
        ? `Hola ${name},

Gracias por contactarte con Tandem Lens. Hemos recibido tu mensaje y nuestro equipo de ciberseguridad te responderá a la brevedad.

Si tu consulta es urgente, podés escribirnos directamente a ${process.env.CONTACT_TO}.

Saludos cordiales,
Equipo Tandem Lens`
        : `Hi ${name},

Thank you for reaching out to Tandem Lens. We’ve received your message and our cybersecurity team will get back to you shortly.

If your inquiry is urgent, feel free to email us directly at ${process.env.CONTACT_TO}.

Best regards,
Tandem Lens Team`,
    };

    await transporter.sendMail(autoReply);

    return res.status(200).json({ ok: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('❌ Error sending mail:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

