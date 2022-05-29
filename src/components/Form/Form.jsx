import React, { useEffect, useState } from 'react'
import useStyles from './styles';
import { TextField,Button,Typography,Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';


const Form = ( { currentId,setCurrentId } ) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  console.log("new id",currentId)
  const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
  const user = JSON.parse(localStorage.getItem('profile'));
  const [postData,setPostData] = useState({title:'', message: '', tags: '', selectedFile: ''})

  useEffect(() => {
    if(post) {
      setPostData(post);
    }
  },[post])

  const handleSubmit = (e) => {
      e.preventDefault()
      if((postData.title.length > 0 && postData.title !== '') && (postData.message.length > 0 && postData.message !== '') && (postData.tags.length > 0 && postData.tags !== '')) {
            if(currentId) {
              dispatch(updatePost(currentId,{ ...postData, name: user?.result?.name }));
              setPostData({ title:'', message: '', tags: '', selectedFile: ''});
              setCurrentId(null);
            }
            else {
              dispatch(createPost({ ...postData, name: user?.result?.name }));
              setPostData({ title:'', message: '', tags: '', selectedFile: ''});
              setCurrentId(null);
            }
            console.log(postData)
            
      }
      else {
        alert('Please Fill all props')
      }    
  }

  const resetHandler = (e) => {
    e.preventDefault();
    setPostData({ title:'', message: '', tags: '', selectedFile: ''});
    setCurrentId(null);
  }

  if(!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Please Sign In to Create your Post
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper raised elevation={6}  className={classes.paper}>
        <form autoComplete='off' noValidate className={classes.form} onSubmit={handleSubmit}>
          <Typography variant='h6'>{currentId ? 'Updating' : 'Creating'} a Post</Typography>
             <TextField
              className={classes.textInput} 
              name='title' 
              variant='outlined' 
              label='Title' 
              fullWidth
              required
              value={postData.title}
              onChange={(e) => setPostData({...postData, title: e.target.value})} 
            />
             <TextField
              className={classes.textInput} 
              name='message' 
              variant='outlined' 
              label='Message' 
              fullWidth
              required
              value={postData.message}
              onChange={(e) => setPostData({...postData, message: e.target.value})} 
            />
             <TextField
              className={classes.textInput} 
              name='tags' 
              variant='outlined' 
              label='Tags' 
              fullWidth
              required
              value={postData.tags}
              onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})} 
            />
            <div className={classes.fileInput}>
              <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({...postData,selectedFile:base64})} />
            </div>
            <Button className={classes.buttonSubmit} variant="contained" color='secondary' size="large" type='Submit'  fullWidth >Submit</Button>
            <Button className={classes.buttonSubmit} variant="contained" color='primary' size="large" onClick={resetHandler}  fullWidth >Reset</Button>
        </form>
    </Paper>
  )
}

export default Form