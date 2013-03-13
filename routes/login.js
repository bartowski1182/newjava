var databaseUrl = "mydb";
var collections = ["users", "bugs"];
var db = require("mongojs").connect(databaseUrl, collections);

exports.showLogin = function(req, res) {
	res.render('loginpage', { title: 'Login' });
};

exports.confirmation = function (req, res) {

  	db.users.findOne({username: req.body.user}, function(err, users){
  		console.log(req.body.user);
  		if (!users || err) { console.log('nope');}
  		else {
  			if (validate_password(req.body.password, users.password)) {
  				res.render('account', {title: 'Account', username: users.username, password: users.password});
  			}
  			else {
  				console.log("I don't understand why this is happening");
  			}
  		}
  		console.log(users);
    });
};


function validate_password(pass, cpass)
{
	if(pass != cpass)
	{
		return false;
	}
	return true;
}