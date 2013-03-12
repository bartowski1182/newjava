

exports.registration = function(req, res){
  res.render('registration', { title: 'Register user', givenUser: '', invalidPword: false});
};

exports.confirmation = function(req, res){
  if(validate_password(req.body.password, req.body.passwordConfirmation)){
  	res.render('userInfo', {title: 'User Info', user: req.body.user, password: req.body.password, passwordConfirmation: req.body.passwordConfirmation});
  }
  else{
  	res.render('registration', {title: 'Register user', givenUser: req.body.user, invalidPword: true});
  }
};

function validate_password(pass, cpass)
{
	if(pass != cpass)
	{
		return false;
	}
	return true;
}

