
const mongoose = require('./model')

const model = mongoose.model('React',{    
      BookTitle:String,      
      BookMessage:[
          
       ]        
},'React');




module.exports = model;




