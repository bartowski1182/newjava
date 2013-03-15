
var databaseUrl = "mydb";
var collections = ["users", "bugs"];
var db = require("mongojs").connect(databaseUrl, collections);

exports.registration = function(req, res){
  res.render('registration', { title: 'Register user', existingUser: '', givenUser: '', invalidPword: false});
};

exports.confirmation = function(req, res){
  var render = false;
  db.users.findOne({username: req.body.user}, function(err, users){
    if(users){
      res.render('registration', { title: 'Register user', existingUser: 'User already exists', givenUser: '', invalidPword: false})
      render = false;
    }
    else{
      if(validate_password(req.body.password, req.body.passwordConfirmation)){
        res.render('userInfo', {title: 'User Info', user: req.body.user, password: req.body.password, passwordConfirmation: req.body.passwordConfirmation});
        db.users.save({username: req.body.user, password: req.body.password, userType: "Mod"}, function (err, saved){
         if( err || !saved ) console.log("User not saved");
         else console.log("User saved");
        });
      }
      else{
        res.render('registration', {title: 'Register user', existingUser:'', givenUser: req.body.user, invalidPword: true});
      }
    }
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

