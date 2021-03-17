const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5001;
app.use(bodyParser.urlencoded({
    extended: true
}))

//Ini Buat Listen Deploy Portnya
app.listen(port, () => {
    console.log(port);
})

//Buat ngebuat jsonnya
app.use(express.json())

//ini router


//kalo error 404
app.use((req, res, next) => {
    res.json({
        status: 'error',
        message: 'resource tidak ditemukan'
    })
})

//kalo error 500
app.use((err, req, res, next) => {
    res.json({
        status: 'error',
        message: 'terjadi kesalahan pada server'
    })
})


app.get("/", (req, res) => res.status(200).send("Hello"))