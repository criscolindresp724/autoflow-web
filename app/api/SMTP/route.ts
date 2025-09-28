import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Configura tu SMTP (Gmail en este ejemplo)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER, // tu correo
        pass: process.env.SMTP_PASS, // tu clave de aplicación
      },
    });

    // Opciones de email
    const mailOptions = {
      from: email,
      to: "empresa@tudominio.com",
      subject: `Nuevo mensaje de contacto de ${name}`,
      text: message,
      html: `<p><b>De:</b> ${name} (${email})</p><p>${message}</p>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Error al enviar el correo" }, { status: 500 });
  }
}
