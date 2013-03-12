
/*
 * GET users listing.
 */

var databaseUrl = "mydb";
var collections = ["users", "bugs"];
var db = require("mongojs").connect(databaseUrl, collections);

exports.list = function(req, res){
  console.log("in list");
  db.users.findOne({username: "ioerw"}, function(err, users) {
  if( err || !users) 
  	res.render('userList', {title: 'users', username: 'No user', password: 'No user'});
  else 
  	res.render('userList', {title: 'users', username: users.username, password: users.password});
  });
};