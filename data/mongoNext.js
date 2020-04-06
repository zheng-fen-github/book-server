
const mongoose = require('./model')
const model = mongoose.model('Next',{    
   
  BookTitle:String,      
  BookMessage:[
      
   ] 
      
   
},'Next');




module.exports = model;



