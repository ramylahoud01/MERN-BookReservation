import React from 'react'
import { useLoaderData } from 'react-router-dom'
import UiCard from '../Card/UiCard';

const BookView = () => {
    const data = useLoaderData();
    const book = data.books
  return (
    <div style={{marginLeft:'25px',paddingTop:'20px',paddingBottom:'40px'}}>
    <h1 style={{marginBottom:'40px',color:'#008B8B',fontStyle:'italic'}}>Books Available :</h1>
     {book.map(item =><UiCard key={item._id} item={item} />)}
    </div>
  )
}

export default BookView