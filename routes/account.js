

exports.showAccount = function(req, res){
	res.render("account", { username:req.session.username, password:req.session.password, accountType:req.session.userType, title:"Account"});
};

exports.logout = function(req, res) {
	req.session.destroy(function (err) {
		if (err) {
			console.log("Error: %s", err);
		}
	});

	res.redirect('/');

};