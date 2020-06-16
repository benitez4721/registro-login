const queries = require('../queries/queries')

const db = require('./db')

const bodyParser = require('body-parser')

const express = require('express')

const app = express()

const mysql = require('mysql')
app.use(bodyParser.urlencoded({ extended: false }))

app.use( require('../routes/login'))


queries.crearTablas();

app.listen(3000, () => {
    console.log('Escuchando puerto 3000');
    
})