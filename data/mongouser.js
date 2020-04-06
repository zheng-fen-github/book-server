
const mongoose = require('./model')

const model = mongoose.model('user',{    
      userName:String,      
      account:String,
      password:String,        
},'user');



module.exports = model;




