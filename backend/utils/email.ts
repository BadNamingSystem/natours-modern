import nodemailer from "nodemailer"
import { convert } from "html-to-text"
import AppError from "./appError.js"

type User = {
    email: string
    name: string
}

export default class Email {
    to: string
    firstName: string
    url: string
    from: string

    constructor(user: User, url: string) {
        this.to = user.email
        this.firstName = user.name.split(" ")[0]
        this.url = url
        this.from = `Natours Admin <${
            process.env.NODE_ENV === "production" ? process.env.GMAIL_USER : process.env.EMAIL_FROM
        }>`
    }

    // Send actual Email
    async send(template: "welcome" | "passwordReset", subject: string) {
        const html = this.renderTemplate(template, subject)

        // 1. Production: Gmail
        if (process.env.NODE_ENV === "production") {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_APP_PASS,
                },
            })

            try {
                await transporter.sendMail({
                    from: this.from,
                    to: this.to,
                    subject,
                    html,
                    text: convert(html, { wordwrap: 130 }),
                })
                return
            } catch (err) {
                console.error("BREVO SEND ERROR:", err)
                throw new AppError("There was an error sending the reset email. Please try again later.", 500)
            }
        }

        // 2. Development: Mailtrap
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        })

        await transporter.sendMail({
            from: this.from,
            to: this.to,
            subject,
            html,
            text: convert(html, { wordwrap: 130 }),
        })
    }

    private renderTemplate(template: "welcome" | "passwordReset", subject: string) {
        const baseLayout = (content: string) => `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                    <title>${subject}</title>
                    <style>
                        body { background-color: #f7f7f7; font-family: sans-serif; font-size: 16px; line-height: 1.6; margin: 0; padding: 0; color: #444; }
                        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
                        .wrapper { padding: 40px; }
                        h1 { color: #28b485; font-size: 28px; font-weight: 700; margin-bottom: 25px; }
                        p { margin-bottom: 20px; }
                        .btn { display: inline-block; background-color: #55c57a; color: #ffffff !important; padding: 14px 30px; text-decoration: none; font-weight: 600; border-radius: 100px; text-transform: uppercase; font-size: 14px; }
                    </style>
                </head>
                <body>
                    <div class="container"> <div class="wrapper"> ${content} <p>- Natours Admin</p> </div> </div>
                </body>
            </html>
        `
        const templates = {
            welcome: `
                <h1>Welcome, ${this.firstName}!</h1>
                <p>We're glad to have you! Make sure to upload your user photo!</p>
                <a href="${this.url}" target="_blank" class="btn">Upload photo</a>
            `,
            passwordReset: `
                <h1>Forgot your password?</h1>
                <p>Click the button below to reset your password. This link is valid for only 10 minutes.</p>
                <a href="${this.url}" target="_blank" class="btn">Reset your password</a>
            `,
        }
        return baseLayout(templates[template])
    }

    async sendWelcome() {
        await this.send("welcome", "Welcome to the Natours family!")
    }

    async sendPasswordReset() {
        await this.send("passwordReset", "Your password reset token (valid for 10 min)")
    }
}
