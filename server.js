//Set up
const express = require('express');
const nunjucks = require('nunjucks');
const app = express();

const pg = require('pg');
const morgan = require('morgan');
const port = process.env.PORT || 3000;
const database = require('./config/database');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

//Modelos bd
const models = require('./app/models/users.js');
//Config
//configNunjucks
nunjucks.configure(__dirname + "/public",{
    express: app //Se asigna servidor el servidor de express
});
const client = new pg.Client(database.url);
client.connect()
	.then(db => console.log('BD is connected'))
    .catch(err => console.error(err));

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());
//Routes
//require('./app/routes/routes.js')(app);
//listen
app.listen(port);
console.log("App listening on port " + port);

//Ejemplos
app.get("/", function(req, res){
    res.render("");
});

//Otro

app.get("/ejemplo", function(req, res){
    models.users.find(1).success(function(users){
        console.log('Se encontro el usuario: '+users.first_name);
        res.render("ejemplo.html",{
            usersP: users
        });
    });
});