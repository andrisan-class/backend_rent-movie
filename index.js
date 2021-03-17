const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

//ini router
const routers = require('./src/routes/routers')
app.use(routers);

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



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})