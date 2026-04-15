import nodemailer from "nodemailer"
import { convert } from "html-to-text"

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
        this.from = `Natours Reloaded <${
            process.env.NODE_ENV === "production" ? "onboarding@resend.dev" : process.env.EMAIL_FROM
        }>`
    }

    private newTransport() {
        if (process.env.NODE_ENV === "production") {
            return nodemailer.createTransport({
                host: process.env.RESEND_HOST,
                port: Number(process.env.RESEND_PORT),
                secure: true,
                auth: {
                    user: "resend",
                    pass: process.env.RESEND_API_KEY,
                },
            })
        }
        // Mailtrap for dev server
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        })
    }

    private renderTemplate(template: "welcome" | "passwordReset", subject: string) {
        // Base Layout
        const baseLayout = (content: string) => `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                    <title>${subject}</title>
                    <style>
                        /* GLOBAL STYLES */
                        body {
                          background-color: #f7f7f7;
                          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                          font-size: 16px;
                          line-height: 1.6;
                          margin: 0;
                          padding: 0;
                          color: #444;
                        }
                        
                        /* CONTAINER */
                        .container {
                          max-width: 600px;
                          margin: 20px auto;
                          background: #ffffff;
                          border-radius: 12px;
                          overflow: hidden;
                          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                        }
                        
                        .wrapper { 
                          padding: 40px; 
                        }
                        
                        /* TYPOGRAPHY */
                        h1 {
                          color: #28b485;
                          font-size: 28px;
                          font-weight: 700;
                          margin-bottom: 25px;
                          letter-spacing: -0.5px;
                        }
                        
                        p { margin-bottom: 20px; }
                        
                        /* BUTTONS */
                        .btn {
                          display: inline-block;
                          background-color: #55c57a;
                          color: #ffffff !important;
                          padding: 14px 30px;
                          text-decoration: none;
                          font-weight: 600;
                          border-radius: 100px;
                          text-transform: uppercase;
                          font-size: 14px;
                          transition: all 0.3s;
                        }
                        
                        .btn:hover {
                          background-color: #28b485;
                          transform: translateY(-2px);
                          box-shadow: 0 5px 15px rgba(85, 197, 122, 0.3);
                        }
                        
                        /* FOOTER */
                        .footer {
                          text-align: center;
                          padding: 20px;
                          font-size: 12px;
                          color: #999;
                        }

                        .footer a { color: #55c57a; text-decoration: none; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="wrapper">
                            ${content}
                            <p>- Natours Reloaded</p>
                        </div>
                    </div>
                </body>
            </html>
        `
        // Specific Template Content
        const templates = {
            welcome: `
                <h1>Welcome, ${this.firstName}!</h1>
                <p>We're glad to have you. We're all a big family here, so make sure to upload your user photo!</p>
                <a href="${this.url}" target="_blank" class="btn">Upload user photo</a>
            `,
            passwordReset: `
                <h1>Forgot your password?</h1>
                <p>Submit a PATCH request with your new password and passwordConfirm to: ${this.url}.</p>
                <p>(If you didn't forget your password, please ignore this email!)</p>
                <a href="${this.url}" target="_blank" class="btn">Reset your password</a>
            `,
        }
        return baseLayout(templates[template])
    }

    // Send actual Email
    async send(template: "welcome" | "passwordReset", subject: string) {
        // 1. Generate HTML
        const html = this.renderTemplate(template, subject)
        // 2. Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: convert(html, {
                wordwrap: 130,
            }),
        }
        // 3. Send email
        await this.newTransport().sendMail(mailOptions)
    }
    async sendWelcome() {
        await this.send("welcome", "Welcome to the Natours family!")
    }
    async sendPasswordReset() {
        await this.send("passwordReset", "Your password reset token (valid for 10 min)")
    }
}
