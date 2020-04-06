const express = require('express');
const router = express.Router();
const  bodyParser = require('body-parser');



let cif = {
    origin:'http://localhost:3000',
    credentials: true,
}




router.post('/json',bodyParser.json(),async (req,res) => {
    
    console.log(req.body);
    res.json(req.body)
})




module.exports  = router;