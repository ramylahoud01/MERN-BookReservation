import mongoose from "mongoose";
const Schema =mongoose.Schema;

const BookSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    publicationDate:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    }
},{timestamps:true})

export default mongoose.model('Book',BookSchema)