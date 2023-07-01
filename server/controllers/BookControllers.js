import Book from "../model/Book.js";

export const AddNewBook = (req,res,next)=>{
    console.log(req.file)
    const title = req.body.title;
    const author = req.body.author;
    const language = req.body.language;
    const publicationDate = req.body.publicationDate;

    const book = new Book({
        title:title,
        author:author,
        language:language,
        publicationDate:publicationDate,
        imageUrl:req.file.path
    })

    book.save()
    .then(BookDetails =>{
        if(!BookDetails){
            const error = new Error('Cannot find user');
            error.statusCode = 404;
            throw error;
        }
        res.status(201).json({BookDetails:BookDetails})
    }).catch(err =>{
        next(err)
    })
}

export const ViewAllBook = (req,res,next)=>{
    Book.find().then(books =>{
        if(!books){
            const error = new Error('Could not find books');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({books:books})
    }).catch(err =>{
        next(err)
    })
}

export const DeleteBook = (req,res,next) =>{
    const id = req.params.BookId;

    Book.findById(id).then(book =>{
        if(!book){
            const error = new Error('Could not find books');
            error.statusCode = 404;
            throw error;
        }
        return Book.findByIdAndRemove(id)
    }).then(()=>{
        res.status(200).json({message:"Deleted"})
    }).catch(err =>{
        next(err)
    })
}