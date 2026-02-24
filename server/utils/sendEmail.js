const nodemailer = require('nodemailer');

async function sendEmail({ to, subject, text, html }) {
    const mailUser = process.env.MAIL_USER;
    const mailPass = process.env.MAIL_PASS;
    const brevoKey = process.env.BREVO_API_KEY;

    // Método 1: Brevo HTTP API (funciona en Render y en local)
    if (brevoKey) {
        try {
            const response = await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'api-key': brevoKey,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    sender: { name: 'TaskFlow', email: mailUser },
                    to: [{ email: to }],
                    subject: subject,
                    htmlContent: html || `<p>${text}</p>`
                })
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Email enviado via Brevo');
                return true;
            }
            console.log('Brevo error:', JSON.stringify(data));
        } catch (brevoErr) {
            console.log('Brevo falló:', brevoErr.message);
        }
    }

    // Método 2: Nodemailer SMTP (funciona localmente)
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: { user: mailUser, pass: mailPass },
            connectionTimeout: 8000,
            greetingTimeout: 8000,
            socketTimeout: 8000
        });

        await transporter.sendMail({ from: mailUser, to, subject, text, html });
        console.log('Email enviado via SMTP');
        return true;
    } catch (smtpErr) {
        console.log('SMTP falló:', smtpErr.message);
    }

    return false;
}

module.exports = sendEmail;
