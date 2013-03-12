
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Android Dev Site', welcome: 'our Android Dedicated Site!' });
};