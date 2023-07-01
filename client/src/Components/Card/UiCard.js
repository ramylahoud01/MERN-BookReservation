import React, { useEffect } from 'react'
import { Card,CardMedia,CardContent,Typography, Stack, Button, ButtonGroup } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const UiCard = (props) => {
  const navigate = useNavigate()
  const date = ((new Date(props.item.publicationDate))).toLocaleString("en-US", { timeZone: "Asia/Beirut", year: "numeric", month: "2-digit", day: "2-digit", hour12: true })
  
  const DeleteHandler = (event)=>{
    event.preventDefault()
    fetch(`http://localhost:8080/book/delete/${props.item._id}`,{method:'Delete'})
    .then(response =>{
      return navigate('/view/book')
    })
  
  }
  useEffect(()=>{

  },[navigate])

  return (
  <Card style={{width:'55%',height:'250px',marginTop:'20px',marginLeft:'20px',position:'relative'}} >
    <Stack direction={'row'} spacing={4}>
    <CardMedia
    component={'img'}
      src={`http://localhost:8080/${props.item.imageUrl}`}
      alt={`${props.item.title}`}
      style={{
        width: '170px',
        height: '250px',
        objectFit: 'cover',
      }}
      />
     <CardContent>
      <Stack spacing={3}>
        <Typography variant='p' fontFamily={'revert-layer'}><span style={{fontStyle:'italic',fontWeight:'bold'}}>Title :</span> {props.item.title}</Typography>
        <Typography variant='p' fontFamily={'revert-layer'}> <span style={{fontStyle:'italic',fontWeight:'bold'}}>Author :</span> {props.item.author}</Typography>
        <Typography variant='p' fontFamily={'revert-layer'}> <span style={{fontStyle:'italic',fontWeight:'bold'}}>Language :</span> {props.item.language}</Typography>
        <Typography variant='p' fontFamily={'revert-layer'}> <span style={{fontStyle:'italic',fontWeight:'bold'}}>publicationDate :</span> {date}</Typography>
      </Stack>
      </CardContent>
    
        <Stack direction={'column'} >
          <Stack sx={{position:'absolute',right:'0px'}} direction={'row'}>
            <ButtonGroup>
                 <Button color='error' variant='contained' onClick={DeleteHandler}>Remove</Button>
          </ButtonGroup>
          </Stack>
        </Stack>
      </Stack>
  </Card>


  )
}

export default UiCard
