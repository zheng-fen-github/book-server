
const mongoose = require('./model')

const model = mongoose.model('message',{    
      message:String,            
      time:String,        
},'message');



module.exports = model;




