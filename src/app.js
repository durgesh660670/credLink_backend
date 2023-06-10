const bodyParser = require('body-parser');
const cors       = require('cors');
const hemlet     = require('helmet');
const express    = require('express');
const app        = express();
const dbconnect  = require('./config/database');
const postRoutes  = require('./routes/postRoute');
const usrComments =require('./routes/commentsRoute')
const authRoute = require('./routes/authRoute')
const profileRoute = require('./routes/profileRoute')
const likeRoute= require('./routes/likeRoute')
const { logger2 } = require('../middleware/logger')
app.use(logger2)

app.use(cors());
app.use(hemlet());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
// app.use('/api');

//preventing CORS errors
// app.use((req,res,next)=>{
//     res.header("Access-Control-Allow-Origin","*")
//     res.header(
//         "Access-Control-Allow-Origin",
//         "origin,X-Requested-With,Content-Type,Accept,Authorization"
//     )
//     if(req.method==="OPTIONS"){
//         res.header('Access-Control-Allow-Methods','PUT,PATCH,POST,GET,DELETE')
//         return res.status(200).json({})
//     }
//     next()
// })
app.use('/postcl',postRoutes);
app.use('/comments',usrComments);
app.use('/user', authRoute);
app.use('/profile', profileRoute);
app.use('/like', likeRoute);
// app.use('/postcl/:postId',postRoutes);

app.use((req,res,next)=>{
    const error=new Error('Not found')
    error.status=404;
    next(error)
})
app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        message:error.message
    })
});

module.exports=app;