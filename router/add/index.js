const express = require('express');
const router = express.Router();
const  bodyParser = require('body-parser');
const multer = require('multer');

const jsDb = require('../../data/mongoose.js');
const RsDb = require('../../data/mongoReact.js');
const HtDb = require('../../data/mongoHtml.js');
const CsDb = require('../../data/mongoCss.js');
const NeDb = require('../../data/mongoNext.js');
const btDb = require('../../data/mongoBootstrap.js');
const arrDb = [jsDb,RsDb,HtDb,CsDb,NeDb,btDb];


const cors = require('cors');



let cif = {
    origin:'http://49.234.96.80:4000',
    methods: 'GET,HEAD,PUT,POST',
    allowedHeaders:'Content-Type',
    credentials: true,
}
router.use(cors(cif));




router.post('/book/:id',multer().none(),async (req,res) => {

    
      
     
     let {BookMessage,BookTitle} = req.body;   //获取想要的信息。
     let Book = JSON.parse(BookMessage);
     Book.createTime = Date.now();
     let Title = BookTitle;
    
     let { password } = req.body;
      
    
     if( !Title || !Book ) {
        return  res.status(404).json('发送的信息又缺少。？？？');
     }
     
     let count = req.params.id;
     
     console.log('查看id 是属于哪个类目的。。'+count)     
     
     const modelED = arrDb[count];
  try {
     let findBook = await modelED.findOne({
            BookTitle:Title,
     });
  
     if(findBook) {                          //如果书籍存在 添加信息
         let {BookMessage} = findBook;
         BookMessage.push(Book);
         let save = await modelED.findOneAndUpdate(
             {
                BookTitle:Title,                
             },
             {                
                BookMessage,
            },
            {
                new:true
            });

         res.status(200).json(save);
      }

    }catch(err) {
        if(err) console.log(err);
        return  res.status(404).json('服务端错误');
    }
   
})



router.post('/addbook/:id',multer().none(),async (req,res) => {
    
    let { Title } = req.body;                         
    if( !Title ) {
       return  res.status(404).json('发送的信息又缺少。？？？');
    }
    
    let count = req.params.id;
    
    console.log('查看id 是属于哪个类目 ? ?'+count)     

    const modelED = arrDb[count];
    if(!modelED) {
        return  res.status(404).json('发送的路由错误。？？？');
    }
    try {

        let Book = await new modelED({
            BookTitle:Title,
        }).save();
        let data = await  modelED.where();
        res.json(data);
    }catch(err) {
        console.log(err);
        return  res.status(404).json('服务端错误');
    }
     
})









module.exports  = router;