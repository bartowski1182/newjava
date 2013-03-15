var databaseUrl = "mydb";
var collections = ["users", "bugs", "roms"];
var db = require("mongojs").connect(databaseUrl, collections);


exports.submission = function(req, res){
  res.render('submitROM', {title:"Submit Rom", romexists: '', description: ''});
}

exports.saveROM = function(req, res){
  console.log("problem 1");
  db.roms.findOne({name: req.body.name}, function(err, roms){
    if(err != null || roms != null){
      console.log(err);
      console.log(roms);
    	res.render('submitROM', {title: 'Submit ROM', romexists: 'A ROM by that name already exists', description: req.body.description});
    }
    else{
      db.roms.save({name: req.body.name, description: req.body.description}, function (err, saved){
       if( err || !saved ) console.log("ROM not saved");
       else{
          res.render('displayROM', { title: "ROM", name: req.body.name, description: req.body.description });
          console.log("ROM saved");
       }
      });
    }
  });
}

exports.search = function(req, res){
  res.render('rom_search', {title: "ROM Search", norom: ''});
}

exports.displaysearch = function(req, res){
  db.roms.findOne({name: req.body.name}, function(err, roms){
    if(err || !roms){
    	res.render('rom_search', {title: 'ROM Search', norom: 'ROM does not exist'});
      console.log('no rom');
    }
    else{
    	res.render('rom_search_results', {title: 'ROM Display', name: roms.name, description: roms.description});
    }
  });
}

exports.editROM = function(req,res){
  console.log(req.body.rname);
  console.log(req.body.description)
  res.render('rom_edit', {title: 'Edit ROM', rname: req.body.rname, rdescription: req.body.description});

}

exports.saveEdit = function(req,res){

  db.roms.update({name: req.body.name}, {$set: {name: req.body.newname}});
  db.roms.update({name: req.body.newname}, {$set: {description: req.body.description}});
  res.render('displayROM', { title: "ROM", name: req.body.newname, description: req.body.description })

}

exports.cancelEdit = function(req,res){

  

}