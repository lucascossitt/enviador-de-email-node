const nodemailer = require('nodemailer')

module.exports = async function (toAddress, subject, text) {
    return new Promise(async function (resolve, reject) {
        try {
            const USER_EMAIL = process.env.USER_EMAIL
            const USER_PASS = process.env.USER_PASS
            const transporter = await nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: USER_EMAIL,
                    pass: USER_PASS
                }
            })

            const response = await transporter.sendMail({
                from: '"Lucas Cossitt" <lucascossitt@gmail.com>',
                to: toAddress,
                subject: subject,
                text: text
            })

            resolve(response)
        } catch (err) {
            reject(err)
        }
    })
}