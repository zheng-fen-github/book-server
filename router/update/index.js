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
    
     let {title,newTitle,findTitle} = req.body;
     
     if( !title ) {
         return res.status(404).json('信息有缺 请核对！！！');
     }
     console.log(title)
     let count = req.params.id;   
     const modelED = arrDb[count];

     if( !modelED ) {
        return res.status(404).json('路由错误 请重试！！！');
     }
     
     try{
         let find = await modelED.findOne({
             Title:title
         });
         if( !find ) {
            return res.status(404).json('为找到相关书籍 请确认！！！');
         }
         
         let {Content} = find;
         console.log(findTitle);
         let result = Content.filter((e,index) => {
            if( e.pageTitle == findTitle){
                return e;
            }
        
         })
         res.json(result);        

        //  Content.push({
        //      name:'zhengfen',
        //      age:23,
        //      live:'xiaoyilin',
        //  })
        // let bookTitle = newTitle? newTitle :title;   //查看是否更改标题。。


        // let update = await  modelED.updateOne({
        //     Title:title,
            
        // },{
        //     // Title:bookTitle,
        //     // Content,
        // });
         
        
         
        // if(update.ok > 0) {
        //      res.json(`修改书籍 ${title} 成功`);            
        // }else{
        //     throw new Error('修改成功数据为0')
        // }
         

     }catch(err) {

         console.log(err);
         console.log('服务端数据库操作错误');
         return res.status(404).json('服务端数据库操作错误');
         
     }    
 
     
     
    
     
})




module.exports  = router;