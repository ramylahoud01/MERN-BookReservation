import React, { useState,useRef } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useNavigate,useNavigation } from 'react-router-dom';

function BookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [language, setLanguage] = useState('');
  const [publicationDate, setPublicationDate] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const navigation = useNavigation();
  const submitting = navigation.state === 'submitting';
  const navigate = useNavigate();
  
  const ChangeDateHandler = (changedvalue) => {
    setPublicationDate(changedvalue);
  };

  const formData = new FormData();
  formData.append('title', title);
  formData.append('author', author);
  formData.append('language', language);
  formData.append('publicationDate', publicationDate);
  formData.append('BookImage', imageFile);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!title || !author || !language || !publicationDate || !imageFile) {
      setError('All fields are required.');
      return;
    }

    fetch('http://localhost:8080/book', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        return  navigate('/view/book')
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setTitle("");
      setAuthor("");
      setLanguage("");
      setPublicationDate(null);
      setError("");
  };

  return (
      <form method="POST" onSubmit={submitHandler} >
        <Stack
          direction="column"
          spacing={3}
          border="0.5px solid #5F9EA0"
          width="fit-content"
          display="flex"
          sx={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            borderRadius: '10px',
            transform: 'translate(-50%, -50%)',
            bgcolor:'white'
          }}
        >
          <Stack sx={{ background: 'linear-gradient(139deg, rgba(255,255,255,1) 0%, rgba(236,236,236,1) 50%, rgba(162,171,194,1) 100%)' }} padding="20px">
            <Typography
              fontStyle="italic"
              textAlign="center"
              fontWeight="bold"
              variant="h6"
              color='#7b93d0'
            >
              Book Form:
            </Typography>
          </Stack>
          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}
          <Stack direction="row" padding="0 50px">
            <TextField
              label="Title"
              value={title}
              variant="standard"
              onChange={(e) => setTitle(e.target.value)}
              sx={{ width: '240px' }}
              name="title"
            />
          </Stack>
          <Stack direction="row" padding="0 50px">
            <TextField
              label="Author"
              value={author}
              variant="standard"
              onChange={(e) => setAuthor(e.target.value)}
              sx={{ width: '240px' }}
              name="author"
            />
          </Stack>
          <Stack direction="row" padding="0 50px">
            <TextField
              label="Language"
              value={language}
              variant="standard"
              onChange={(e) => setLanguage(e.target.value)}
              sx={{ width: '240px' }}
              name="language"
            />
          </Stack>
          <Stack direction="row" padding="0 50px">
            <DatePicker
              name="publicationDate"
              onChange={ChangeDateHandler}
              sx={{ width: '240px' }}
              value={publicationDate}
              format="dd/MM/yyyy"
              locale="en-LB"
              size="small"
            />
          </Stack>
          <Stack direction="row" padding="0 50px">
            <TextField
              type="file"
              onChange={handleImageUpload}
              inputRef={fileInputRef} 
              size="small"
              sx={{ width: '240px' }}
              name="image"
            />
          </Stack>
          <Stack direction="column" padding="15px 50px">
            <Button type="submit" variant="contained" color="primary" disabled={submitting}>
              {submitting ?'Submiting...' :'Submit'}
            </Button>
          </Stack>
        </Stack>
      </form>
  );
}

export default BookForm;
