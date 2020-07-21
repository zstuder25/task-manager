const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'zstuder25@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you like the app.`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'zstuder25@gmail.com',
        subject: 'Cancellation Confirmation',
        text: `We're sorry to see you go ${name}! Is there anything we could have done to have kept you?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}