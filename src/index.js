require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const enviarEmail = require('./services/enviarEmail')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', express.static(__dirname + '/static'))

console.log(__dirname + '/static')

app.post('/enviar-email', async (req, res) => {
    try {
        const toAddress = req.body.to_address
        const subject = req.body.subject
        const text = req.body.text
    
        if (!toAddress || !subject || !text)
            return res.status(400).send("Preencha todos os campos")
    
        const response = await enviarEmail(toAddress, subject, text)

        console.log("Email enviado para:", toAddress)
        res.status(200).send(response)
    } catch (err) {
        console.error(err, {depth: null})
        res.status(500).send()
    }
})

app.listen(8080, () => console.log('Iniciado na porta 8080'))