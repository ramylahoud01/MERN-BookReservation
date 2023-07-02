import express from "express"
const app = express();
import Bookroute from "./routes/BookRoutes.js";
import bodyParser from "body-parser";
import mongoose from "mongoose";
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE')
    res.setHeader('Access-Control-Allow-Headers','Content-type , Authorization')
    next();
})
app.use('/uploads',express.static('uploads'))
app.use((error,req,res,next)=>{
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message:message})
})

app.use(Bookroute);

mongoose.connect('').then(()=>{
    console.log('Connected...')
    app.listen(8080)
}).catch(err =>{
    console.log(err)
})
