import express from "express"
const Bookroute = express.Router();
import multer from "multer";
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const filterFile = (req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true)
    }else{
        cb(null,false)
    }
}
const upload = multer({storage:storage,fileFilter:filterFile})
import { AddNewBook,ViewAllBook,DeleteBook } from "../controllers/BookControllers.js";

Bookroute.post('/book',upload.single('BookImage'),AddNewBook)
Bookroute.get('/book/view',ViewAllBook)
Bookroute.delete('/book/delete/:BookId',DeleteBook)
export default Bookroute