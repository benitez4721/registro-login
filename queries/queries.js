
const db = require('../server/db')
const jwt = require('jsonwebtoken')

function crearTablas(){
    let sql = 'CREATE TABLE IF NOT EXISTS usuarios (id INT PRIMARY KEY,email VARCHAR(255) UNIQUE, password VARCHAR(255))'
    db.query(sql, (err, result) => {
        if( err ) {
            console.log(err);
            return   
        }
        console.log("Tablas creadas correctamente");
        
    })
    
}

function crearUsuario(body, res){

    // Verificamos que el correo no ha sido ingresado en la base de datos
    let sqlEmail = `SELECT email FROM usuarios WHERE email = '${body.email}'`
    db.query(sqlEmail, (err, result,fields) => {
        if(err) {
            console.log(err);
            return res.status(400).json({
                ok: false,
                mensaje: "Fallo en querie buscar email"
            })
            
        }

        if(result.length > 0){
            return res.status(400).json({
                ok: false,
                mensaje: "Este correo ya ha sido utilizado"
            })
        }
        let sql = `INSERT INTO usuarios (email, password) VALUES ('${body.email}',AES_ENCRYPT(${body.password},'secret'))`
        db.query(sql, (err, result) => {
            if( err ) {
                console.log("aqui toy");
                return  res.status(400).json({
                    ok: false,
                    err
                })  
            }
            res.json({
                ok: true,
                mensaje: "Registro insertado correctamente"
            })
            
        })
        
        
        
    })
 
   
}

async function getUsusarioLogin(req,res) {
    let getUsuarioDB = `SELECT email FROM usuarios WHERE password = AES_ENCRYPT(${req.body.password},'secret') and email = '${req.body.email}' `
    db.query(getUsuarioDB, (err,result,fields) => {
        if(err){
        
            return res.status(400).json({
                ok: true,
                err
            })
        }

        if(result < 1){
            return res.json({
                ok: false,
                mensaje: "Ocurrio algo inserperado"
            })
        }
        let token = jwt.sign({
            usuario: result 
        }, 'secret', {expiresIn: '1hr'})

        return res.json({
            ok: true,
            usuario: result,
            token
        })
    }) 
     
}



module.exports = {
    crearTablas,
    crearUsuario,
    getUsusarioLogin
}