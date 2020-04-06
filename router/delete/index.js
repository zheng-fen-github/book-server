const express = require('express');
const router = express.Router();

const jsDb = require('../../data/mongoose.js');
const RsDb = require('../../data/mongoReact.js');
const HtDb = require('../../data/mongoHtml.js');
const CsDb = require('../../data/mongoCss.js');
const NeDb = require('../../data/mongoNext.js');
const btDb = require('../../data/mongoBootstrap.js');

const arrDb = [jsDb,RsDb,HtDb,CsDb,NeDb,btDb];

const multer = require('multer');
const cors = require('cors');
let cif = {
    origin:'http://49.234.96.80:4000',
    credentials: true,
}
router.use(cors(cif));

const parserForm = multer();


router.post('/book/:id',parserForm.none(),async (req,res) => { 
    
     let {Title,List} = req.body;
     if( !Title || !List ) {
         return res.status(404).json('信息有缺 请核对！！！');
     }
     console.log(Title,JSON.parse(List));
     let count = req.params.id;   
     const modelED = arrDb[count];
 
     if( !modelED ) {                                        //查看数据库是否存在
        return res.status(404).json('路由错误 请重试！！！');
     }
     
     try{
        let Book= await modelED.findOne({
               BookTitle:Title,
         });
         let {BookMessage} = Book;
         let deleteAfter = BookMessage.filter(e => {
             if(!List.includes(e.createTime)){
                return e;
             }
         })
         let save = await modelED.findOneAndUpdate(     //删除书籍内容
            {
               BookTitle:Title,                
            },
            {                
               BookMessage:deleteAfter,
           },
           {
               new:true
           });
           return res.json(save);
         
     }catch(err) {
         
         console.log(err);
         console.log('服务端数据库操作错误');
         return res.status(404).json('服务端数据库操作错误');
         
     } 

     
})













module.exports  = router;