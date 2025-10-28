// api/contact.js

const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Solo permitimos POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, company, message } = JSON.parse(req.body || '{}');

    if (!name || !email || !company || !message) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    // Creamos el transporter SMTP usando credenciales seguras en variables de entorno
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,      // ej: "smtp.gmail.com"
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // STARTTLS normalmente
      auth: {
        user: process.env.SMTP_USER,    // ej: "info@tandemlens.com"
        pass: process.env.SMTP_PASS,    // password o app password
      },
    });

    // Email que se envía A VOS (interno)
    await transporter.sendMail({
      from: `"Website Lead" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO, // a dónde querés que lleguen los leads
      subject: `New lead from ${name} (${company})`,
      text: `
Name: ${name}
Email: ${email}
Company: ${company}

Message:
${message}
      `,
    });

    // (opcional) respuesta automática al usuario
    await transporter.sendMail({
      from: `"Tandem Lens" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `We received your message`,
      text: `Hi ${name}, thanks for reaching out. Our team will contact you shortly.`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Error sending mail', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

