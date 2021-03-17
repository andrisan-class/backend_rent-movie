const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5001;
const dbConn = require('./db.config');
const request = require('request')
const api_key = 'c9bf1ee0d8f622cbc18350bbab12d1d2';

app.use(express.urlencoded({
    extended: true
}))

//Ini Buat Listen Deploy Portnya
app.listen(port, () => {
    console.log(port);
})

//Buat ngebuat jsonnya
app.use(express.json())

//ini router
app.get('/movies', (req, res) => {
    request('https://api.themoviedb.org/3/discover/movie?api_key=' + api_key, (err, body) => {
        res.send(JSON.parse(body.body))
    })
})

//ini route buat crud
app.post('/add', (req, res, next) => {
    let judul = req.body.judul;
    let slogan = req.body.slogan;
    let sutradara = req.body.sutradara;
    let errors = false;

    if (judul.length === 0 || slogan.length === 0 || sutradara.length === 0) {
        errors = true;

        res.send("Ada yang kosong!")
    }

    else if (!errors) {
        var form_data = {
            'judul': judul,
            'slogan': slogan,
            'sutradara': sutradara
        }

        dbConn.query('INSERT INTO film SET ?', form_data, (err, result) => {
            if (err) {
                res.send('error')
            } else {
                res.send('Film successfully added!')
            }
        })
    }
})

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