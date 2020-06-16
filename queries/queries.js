
const db = require('../server/db')

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

function verificarCorreo(correo) {
    let sqlEmail = `SELECT email FROM usuarios WHERE email = '${correo}'`
    db.query(sqlEmail, (err, result,fields) => {
        if(err) {
            
            return false            
        }

        if(result.length > 0){
            return true
        }
        console.log("aqui");
        return false
    })
}


module.exports = {
    crearTablas,
    crearUsuario,
    verificarCorreo,
}