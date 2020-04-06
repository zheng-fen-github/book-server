const express = require('express');
const router = express.Router();

const jsDb = require('../../data/mongoose.js');
const RsDb = require('../../data/mongoReact.js');
const HtDb = require('../../data/mongoHtml.js');
const CsDb = require('../../data/mongoCss.js');
const NeDb = require('../../data/mongoNext.js');
const btDb = require('../../data/mongoBootstrap.js');

const arrDb = [jsDb,RsDb,HtDb,CsDb,NeDb,btDb];


const cors = require('cors');
let cif = {
    origin:'http://localhost:3000',
    credentials: true,
}
router.use(cors(cif));




router.get('/book/:id',async (req,res) => {     
     let count = req.params.id;   
     const modelED = arrDb[count];
     let data = await modelED.where();
     console.log('查看id 是属于哪个类目的。。'+count);    

     res.json(data);
})













module.exports  = router;