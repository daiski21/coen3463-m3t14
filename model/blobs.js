var mongoose = require('mongoose');  
var blobSchema = new mongoose.Schema({  
  name: {type: String, required: true},
  link: String,
  steps: {type: String, requirequired: true},
  MMG: String,
  DMG: String,
  OMG: String,
  type: String,
  mechanics: String,
  equipment: String,
  difficulty: String,
  image: String,
  date: String
});
mongoose.model('workouts', blobSchema);