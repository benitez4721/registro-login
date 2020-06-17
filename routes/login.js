const express = require('express');
const db = require('../server/db')
const {check, validationResult} = require('express-validator')
const queries = require('../queries/queries')
const {verificarCorreoLogin, verificarContrasenaLogin} = require('../middlewares/middlewares');


const app = express()

app.post('/registro',[

    check('password').isLength({min:5}).withMessage('Debe ser de al menos 5 caracteres'),
    check('email').matches(/\w+@[a-zA-Z]+\.[a-zA-Z]/).withMessage("email invalido")

] ,(req,res) => {

    const errors = validationResult(req);

    if( !errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()})
    }

    let body = req.body

    queries.crearUsuario(body,res)
    
    
})

app.post('/login',[verificarCorreoLogin,verificarContrasenaLogin],async (req, res) => {
    
    queries.getUsusarioLogin(req,res); 
    

})

module.exports = app