const db = require('../server/db')

let verificarCorreoLogin = (req,res,next) => {
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
        next()
    })   

}

let verificarContrasenaLogin = (req,res,next) => {
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
                usuario: "El correo o la (contrasena) no es valido"
            })
        }
        next()
    })    
}
module.exports = {
    verificarCorreoLogin,
    verificarContrasenaLogin
}