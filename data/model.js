const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/book';
const url2 = 'mongodb+srv://zhengfen:haoyunlai123@cluster0-4biyb.mongodb.net/book?retryWrites=true&w=majority';

mongoose.connect(url2,{useNewUrlParser:true,useUnifiedTopology: true});

module.exports = mongoose;