const express = require('express');
const app = express();
const cors = require('cors');
const  bodyParser = require('body-parser');
const mongodb = require('./data/mongoose.js')
const addBook =  require('./router/add/index')

const findBook =  require('./router/find/index')

const deleteBook =  require('./router/delete/index')

const updateBook =  require('./router/update/index')

const useMongo = require('./data/mongouser')



const message = require('./router/message')

let cif = {
    origin:'http://49.234.96.80:4000',
    credentials: true,
    allowedHeaders:'Authorization',
    methods:['POST','GET']
}
app.use(cors(cif));


app.get('/look',async (req,res) =>{
         let data = await mongodb.where();
         console.log(data);
         res.json(data);
} )

app.post('/json',bodyParser.json(),async (req,res) => {
    console.log('?????')
    console.log(req.body);
    res.json(req.body)
})

 app.use('/add',addBook);   //  添加书籍路由

 app.use('/find',findBook);   //  查找书籍路由

 app.use('/delete',deleteBook);   //  删除书籍路由

 app.use('/update',updateBook);   //  修改书籍路由

 app.use('/message',message);   //  发送信息路由

app.listen(4040,()=>console.log('server started .... 4040'));






