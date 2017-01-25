var mongoose = require('mongoose');  
var blobSchema = new mongoose.Schema({  
  name: String,
  link: String,
  steps: String,
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