const mysql = require('mysql2');
let settings = require("./setting.json");

console.log("" + settings["mysql"].host + "" + settings["mysql"].user + "" + settings["mysql"].database + "");
const connection = mysql.createConnection({
    host: settings["mysql"].host,
    user: settings["mysql"].user,
    database: settings["mysql"].database,
    password: settings["mysql"].password
});

module.exports = function(io) {
    io.on('connection', function(socket) {
        socket.on('CreateTable', () => {
            connection.query('SELECT * FROM `list`', function(err, results, fields) {
                if (err) throw err;
                for (let a = 0; a < results.length; a++) {
                    io.emit('CreateTable', results[a].id, results[a].text, results[a].process, results[a].date);  //results[a].leasson, results[a].link_text
                }
            });
        });

        socket.on('DeleteTableMySQL', (id) => {
            connection.query('UPDATE list SET process = 2 WHERE id = ' + id, function(err, results, fields) {
                if (err) throw err;
            });
        });

        socket.on('SaveTableMySQL', (id) => {
            connection.query('UPDATE list SET process = 1 WHERE id = ' + id, function(err, results, fields) {
                if (err) throw err;
            });
        });

        socket.on('SendDel', (message) => {
            connection.query("INSERT INTO list (`text`, `process`, `date`) VALUES (" + message + ", 1, 202)", function(err, results, fields) {
                if (err) throw err;
            });
        });
    });
};