
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
  , login = require('./routes/login')
  , account = require('./routes/account')
  , rom = require('./routes/rom');

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
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'keyboard cat'}));
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
  if(req.session.username)
    routes.index(req, res, true);
  else
    routes.index(req, res, false);
});
app.get('/users', user.list);
app.get('/register', register.registration)
app.post('/register', register.confirmation)
app.get('/bug_report', bugreporter.bugReporting);
app.post('/bug_report', bugreporter.reportResults);

app.get('/login_page', function(req, res) {
  if(req.session.username && req.session.password)
    res.redirect('/account');
  else
    login.showLogin(req, res);
});

app.post('/login_page', login.confirmation);
app.get('/account', function(req, res) {
  if (req.session.username && req.session.password) {
    account.showAccount(req, res);
  }
  else
    res.redirect('/login_page');
});

app.post('/account', account.showAccount);

app.post('/logout', function(req, res){
  account.logout(req, res);
  //res.redirect('/');
});

app.get('/rom_submission', rom.submission);
app.post('/rom_submission', rom.saveROM);
app.get('/search', rom.search);
app.post('/search', rom.displaysearch);
app.post('/editrom', rom.editROM);
app.post('/saved', rom.saveEdit);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});