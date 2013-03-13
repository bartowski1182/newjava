
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , register = require('./routes/register')
  , bugreporter = require('./routes/bugreporter')
  , login = require('./routes/login');

var app = express();


var databaseUrl = "mydb";
var collections = ["users", "bugs"];
var db = require("mongojs").connect(databaseUrl, collections);



app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/register', register.registration)
app.post('/register', register.confirmation)
app.get('/bug_report', bugreporter.bugReporting);
app.post('/bug_report', bugreporter.reportResults);
app.get('/login_page', login.showLogin);
app.post('/login_page', login.confirmation);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});