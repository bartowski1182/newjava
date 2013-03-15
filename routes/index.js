
/*
 * GET home page.
 */

exports.index = function(req, res, log){
  res.render('index', { title: 'Android Dev Site', welcome: 'our Android Dedicated Site!', isLoggedIn: log });
};