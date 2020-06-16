const express = require('express');
const db = require('../server/db')
const {check, validationResult} = require('express-validator')
const queries = require('../queries/queries')


const app = express()

app.post('/registro',[

    check('password').isLength({min:5}).withMessage('Debe ser de al menos 5 caracteres')
    

] ,(req,res) => {

    const errors = validationResult(req);

    if( !errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()})
    }

    let body = req.body

    queries.crearUsuario(body,res)
    
    
})

module.exports = app