
const mongoose = require('./model')

const model = mongoose.model('Bootstrap',{    
   
  BookTitle:String,      
  BookMessage:[
      
   ] 
      
   
},'Bootstrap');



module.exports = model;

