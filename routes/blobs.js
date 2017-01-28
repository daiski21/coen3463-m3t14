var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');



router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method
        delete req.body._method
        return method
      }
}))


router.get('/', function(req, res, next) {
    if(req.user){   
        mongoose.model('workouts').find({}, function (err, blobs) {
              if (err) {
                  return console.error(err);
              } else {  
                  res.format({  
                    html: function(){
                        res.render('blobs/index', {
                              user: req.user,
                              title: 'All my workouts',
                              "blobs" : blobs
                        });
                    },
                    json: function(){
                        res.json(blobs);
                    }
                });
              }     
        });
    }
    else{
      res.redirect('/auth/login')
    }    
});

router.post('/', function(req, res) {
        var name = req.body.workout_name;
        var link = req.body.youtube_link;
        var steps = req.body.steps;
        var MMG = req.body.MMG;
        var DMG = req.body.DMG;
        var OMG = req.body.OMG;
        var type = req.body.typetype;
        var mechanics = req.body.mechanics;
        var equipment = req.body.equipment;
        var difficulty = req.body.difficulty;
        var image = req.body.image;
        var date = req.body.date;


        mongoose.model('workouts').create({
            name : name,
            link : link,
            steps : steps,
            MMG : MMG,
            DMG : DMG,
            OMG : OMG,
            type : type,
            mechanics : mechanics,
            equipment : equipment,
            difficulty : difficulty,
            image : image,
            date :date,

        }, function (err, blob) {
              if (err) {
                  res.send("There was a problem adding the information to the database.");
              } else {
                  console.log('POST creating new blob: ' + blob);
                  res.format({   
                    html: function(){
                        res.location("blobs");
                        res.redirect("/blobs");
                    },
                    json: function(){
                        res.json(blob);
                    }
                });
              }
        })
});


router.get('/new', function(req, res) {
    res.render('blobs/new', { title: 'Add New Blob' });
});


router.param('id', function(req, res, next, id) {
    mongoose.model('workouts').findById(id, function (err, blob) {
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function(){
                    next(err);
                 },
                json: function(){
                       res.json({message : err.status  + ' ' + err});
                 }
            });
    
        } else {
            req.id = id;
            next(); 
        } 
    });
});

router.route('/:id')
  .get(function(req, res) {
    mongoose.model('workouts').findById(req.id, function (err, blob) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + blob._id);
        
        res.format({
          html: function(){
              res.render('blobs/show', {
                "blob" : blob
              });
          },
          json: function(){
              res.json(blob);
          }
        });
      }
    });
  });

router.route('/:id/edit')
  .get(function(req, res) {
      mongoose.model('workouts').findById(req.id, function (err, blob) {
          if (err) {
              console.log('GET Error: There was a problem retrieving: ' + err);
          } else {
              console.log('GET Retrieving ID: ' + blob._id);
              res.format({
                  html: function(){
                         res.render('blobs/edit', {
                            title: 'Blob' + blob._id,
                            "blob" : blob
                        });
                   },
                  json: function(){
                         res.json(blob);
                   }
              });
          }
      });
  })

  .put(function(req, res) {
      var name = req.body.workout_name;
      var link = req.body.youtube_link;
      var steps = req.body.steps;
      var MMG = req.body.MMG;
      var DMG = req.body.DMG;
      var OMG = req.body.OMG;
      var type = req.body.typetype;
      var mechanics = req.body.mechanics;
      var equipment = req.body.equipment;
      var difficulty = req.body.difficulty;
      var image = req.body.image;
      var date = req.body.date;




      mongoose.model('workouts').findById(req.id, function (err, blob) {
          blob.update({
              name : name,
              link : link,
              steps : steps,
              MMG : MMG,
              DMG : DMG,
              OMG : OMG,
              type : type,
              mechanics : mechanics,
              equipment : equipment,
              difficulty : difficulty,
              image : image,
              date :date,

          }, function (err, blobID) {
            if (err) {
                res.send("There was a problem updating the information to the database: " + err);
            } 
            else {
                   
                    res.format({
                        html: function(){
                             res.redirect("/blobs/" + blob._id);
                       },
                 
                      json: function(){
                             res.json(blob);
                       }
                    });
             }
          })
      });
  })

  .delete(function (req, res){
      mongoose.model('workouts').findById(req.id, function (err, blob) {
          if (err) {
              return console.error(err);
          } else {
              blob.remove(function (err, blob) {
                  if (err) {
                      return console.error(err);
                  } else {
                      console.log('DELETE removing ID: ' + blob._id);
                      res.format({
                            html: function(){
                                 res.redirect("/blobs");
                           },
                          json: function(){
                                 res.json({message : 'deleted',
                                     item : blob
                                 });
                           }
                        });
                  }
              });
          }
      });
  });
module.exports = router;