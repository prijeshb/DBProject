const mysql = require('mysqli');

let conn = new mysql({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'password',
    db:'telemedicine'
        
});

let db= conn.emit(false,'');

module.exports  = {
    database : db   
};