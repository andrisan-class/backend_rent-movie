const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5001;
const dbConn = require('./config/db.config');
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
//TRANSAKSI
//insert transaksi
app.post('/transaksi/add', (req, res, next) => {
    let jenis_transaksi = req.body.jenis_transaksi;
    let lama_pinjam = req.body.lama_pinjam;
    let biaya = req.body.biaya;
    let denda = req.body.denda;
    let id_member = req.body.id_member;
    let id_film = req.body.id_film;
    let errors = false;

    if (jenis_transaksi.length === 0 || lama_pinjam.length === 0 || biaya.length === 0 || denda.length === 0 || id_member.length === 0 || id_film.length === 0) {
        errors = true;
        res.send("Ada yang kosong!")
    }

    else if (!errors) {
        var form_data = {
            'jenis_transaksi': jenis_transaksi,
            'lama_pinjam': lama_pinjam,
            'biaya': biaya,
            'denda': denda,
            'id_member': id_member,
            'id_film': id_film
        }

        dbConn.query('INSERT INTO transaksi SET ?', form_data, (err, result) => {
            if (err) {
                res.send('error')
            } else {
                res.send('Transaksi successfully added!')
            }
        })
    }
})

//query select all transaksi
app.get('/transaksi', (req, res) => {
    dbConn.query('SELECT * FROM transaksi ', (err, result) => {
        if (err) {
            res.send('error')
        } else {
            res.send(result)
        }
    })
})

//query select id transaksi
app.get('/transaksi/:id_transaksi', (req, res, next) => {
    let id_transaksi = req.params.id_transaksi;
    dbConn.query('SELECT * FROM transaksi WHERE id_transaksi = ' + id_transaksi, (err, result) => {
        if (err) {
            res.send('error')
        } else {
            res.send(result)
        }
    })
})

//query update transaksi
app.post('/transaksi/update/:id_transaksi', (req, res, next) => {
    let id_transaksi = req.params.id_transaksi;
    let jenis_transaksi = req.body.jenis_transaksi;
    let lama_pinjam = req.body.lama_pinjam;
    let biaya = req.body.biaya;
    let denda = req.body.denda;
    let id_member = req.body.id_member;
    let id_film = req.body.id_film;
    let errors = false;

    if (jenis_transaksi.length === 0 || lama_pinjam.length === 0 || biaya.length === 0 || denda.length === 0 || id_member.length === 0 || id_film.length === 0) {
        errors = true;
        res.send("Ada yang kosong!")
    }

    else if (!errors) {
        var form_data = {
            'jenis_transaksi': jenis_transaksi,
            'lama_pinjam': lama_pinjam,
            'biaya': biaya,
            'denda': denda,
            'id_member': id_member,
            'id_film': id_film
        }

        dbConn.query('UPDATE transaksi SET ? WHERE id_transaksi = ' + id_transaksi, form_data, (err, result) => {
            if (err) {
                res.send('error')
            } else {
                res.send('Transaksi successfully updated!')
            }
        })
    }
})

//query delete by id
app.post('/transaksi/delete/:id_transaksi', (req, res, next) => {
    let id_transaksi = req.params.id_transaksi;
    dbConn.query('DELETE FROM transaksi WHERE id_transaksi = ' + id_transaksi, (err, result) => {
        if (err) {
            res.send('error')
        } else {
            res.send('delete successfully!')
        }
    })
})
//SAMPAI SINI

//
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