import React,{ useEffect, useState }  from 'react'
import useStyles from './styles';
import { Card,CardActions,CardContent,CardMedia,Button,Typography, ButtonBase } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltIconOutLined from '@material-ui/icons/ThumbUpAltOutlined' 
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { deletePost, likePost, unlikePost } from '../../../actions/posts';
import { useHistory } from 'react-router-dom';

const Post = ({ post,setCurrentId }) => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  const likePostHandler = () => {
      dispatch(likePost(post._id));
      
  }

  const history = useHistory()

  const openPost = () => {
      history.push(`/posts/${post._id}`);
  }

  const dispatch = useDispatch();

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltIconOutLined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltIconOutLined fontSize="small" />&nbsp;Like</>;
  };
    
  return (
      <Card className={classes.card} raised elevation={6}>
        <CardMedia style={{cursor: 'pointer'}} onClick={openPost} className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
          <div className={classes.overlay}>
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
          </div>
          <div className={classes.overlay2}>
             {
              (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                 <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)} ><MoreHorizIcon fontSize="default" /></Button>
              )
            }
           
          </div>
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          </div>
          <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button size="small" color="default" disabled={!user?.result} onClick={likePostHandler}><Likes /></Button>
            {
              (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <Button size="small" color="default" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> Delete</Button>
              )
            }
            
          </CardActions>
    </Card>
  )
}

export default Post