const express = require('express');
const router = express.Router();
const multer = require('multer');

const Db = require('../../data/mongoMessage');



const cors = require('cors');
let cif = {
    origin:'http://49.234.96.80:4000',
    methods: 'GET,HEAD,PUT,POST',
    allowedHeaders:'Content-Type',
    credentials: true,
}
router.use(cors(cif));


router.post('/',multer().none(),async (req,res) => {

    let {message} = req.body;       //获取想要的信息。
    
    let time = new Date();
    console.log(message); 
      console.log(time);
    
     if( !message ) {
        return  res.status(404).json('发送的信息又缺少。？？？');
     }
     
  try {
     let addMessage = await new Db({
         message,
         time,
     }).save();
      res.status(200).json('发送成功');    
    }catch(err) {
        if(err) console.log(err);
        return  res.status(404).json('服务端错误');
    }
})












module.exports  = router;