const mysql = require('mysql')
const queries = require('../queries/queries')

var db;

function connectDatabse() {
    if(!db){
        db = mysql.createConnection({

            host: 'localhost',
            user: 'benitez4721',
            password: '4721566',
            database: 'proyectologin'
        
        })

        db.connect( (err) => {
            if(err){
                console.log("Conexion fallo");
                return
            }
            console.log("Base de datos conectada");
        
        })
    }
    return db
}

module.exports = connectDatabse()