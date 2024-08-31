import { createTransport } from 'nodemailer'

const transport = createTransport({
    host: "smtp.gmail.com",
    service: "Gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
})

const sendMail = async (mailOptions) => {
    try {

        const mailResponse = await transport.sendMail(mailOptions);
        return { status: true, response: mailResponse };

    }
    catch (err) {
        console.log(err);
        return { status: false, error: err }
    }
}

export { sendMail }