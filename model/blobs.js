var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var blobSchema = new mongoose.Schema({  
  name: {type: String, required: true},
  link: String,
  steps: {type: String, required: true},
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
module.exports = mongoose.model('workouts', blobSchema);