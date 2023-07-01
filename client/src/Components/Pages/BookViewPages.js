import React from 'react'
import BookView from '../BookView/BookView'

const BookViewPages = () => {
  return (
  <div style={{background: 'linear-gradient(139deg, rgba(255,255,255,1) 0%, rgba(236,236,236,1) 50%, rgba(162,171,194,1) 100%)',minHeight: '100vh'}}>
    <BookView />
  </div>)
}

export default BookViewPages

export async function loader ({request,params}){
    const response = await fetch('http://localhost:8080/book/view')
    if(!response){
     console.log("Cannot get Book")
    }
    const data = await response.json()
    return data 
 }