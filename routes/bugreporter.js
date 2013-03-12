

exports.bugReporting = function(req, res){
  res.render('bugSubmission', { title: 'Submit a Bug' });
};

exports.reportResults = function(req, res){


  res.render('formDisplay', {title: 'Form Results', bug: req.body.bugs, email: req.body.email, comment: req.body.comments});

};