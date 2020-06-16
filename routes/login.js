const express = require('express');
const db = require('../server/db')
const {check, validationResult} = require('express-validator')
const queries = require('../queries/queries')


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

app.post('/login', (req, res) => {
    let sqlEmail = `SELECT email FROM usuarios WHERE email = '${req.body.email}'`
    db.query(sqlEmail, (err, result,fields) => {
        if(err) {
            
            return res.status(400).json({
                ok: false,
                err
            })           
        }

        if(result.length < 1){
            return res.json({
                ok: false,
                mensaje: "El (correo) o la contrasena no es valido"
            })
        }

        let sqlPassword = `SELECT password FROM usuarios WHERE password = AES_ENCRYPT(${req.body.password},'secret')`
        db.query(sqlPassword, (err,result,fields) => {
            if(err){
                
                return res.status(400).json({
                    ok: true,
                    err
                })
                
            }
            if(result < 1){
                return res.json({
                    ok: false,
                    mensaje: "El correo o la (contrasena) no es valido"
                })
            }

            return res.json({
                ok: true,
                mensaje: `Usuario ${req.body.email} loggeado`
            })
            

        })
        
        
    })
})

module.exports = app