
const db = require('../server/db')

function crearTablas(){
    let sql = 'CREATE TABLE IF NOT EXISTS usuarios (id INT PRIMARY KEY,nombre VARCHAR(255), password VARCHAR(255))'
    db.query(sql, (err, result) => {
        if( err ) {
            console.log(err);
            return   
        }
        console.log("Tablas creadas correctamente");
        
    })
    
}

function crearUsuario(body, res){
    let sql = `INSERT INTO usuarios (nombre, password) VALUES (${body.nombre},AES_ENCRYPT(${body.password},'secret'))`
    db.query(sql, (err, result) => {
        if( err ) {
            console.log("aqui toy");
            
            console.log(err);
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
}


module.exports = {
    crearTablas,
    crearUsuario
}