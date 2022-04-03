const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mysql = require('mysql2');
const session = require('express-session');
require('./socket.js')(io);

//=====================================[Settings]======================================================
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.set('views', __dirname + '/views');
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views/style/'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const connection = mysql.createConnection({
    host: 'sql11.freemysqlhosting.net',
    user: 'sql11483339',
    database: 'sql11483339',
    password: "Xzsuxb8syc"
});

// connection.query("CREATE TABLE list (id INT, text VARCHAR(1000), precess INT(3), date VARCHAR(255))", function(err, results, fields) {
//     if (err) throw err;
//     console.log("Gud :)");
// });
//==============================================[Ссилки]=======================================================
app.get('/', (req, res, next) => {
    res.render('index.html');
});
//======================================================================================================

server.listen(3000, (err) =>{
    if(err){
        throw Error(err);
    }
    console.log(`Server is runnig http://localhost:${3000}`);
});