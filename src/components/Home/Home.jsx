import { Container, Grid, Grow, Paper, AppBar,TextField,Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getPosts, getPostsbySearch } from '../../actions/posts'
import Form from '../Form/Form'
import Paginate from '../Pagination'
import useStyles from './Styles'
import { useHistory,useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'

import Posts from '../Posts/Posts'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const [currentId,setCurrentId] = useState(null);
    console.log("ID",currentId);
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery');
    const [search,setSearch] = useState('');
    const [tags,setTags] = useState([]);

    // useEffect(() => {
    //     dispatch(getPosts());
    // },[currentId,dispatch])

    const handleKeyPress = (e) => {
      if(e.keyCode === 13) {
          searchPost()
      }
    }

    const handleAdd = (tag) => {
        setTags([...tags,tag])
    }
    const handleDelete = (tagtoDelete) => {
        setTags(tags.filter((tag) => tag !== tagtoDelete))
    }

    const searchPost = () => {
        if(search.trim() || tags) {
          // disptach feth search post
          dispatch(getPostsbySearch({ search, tags: tags.join(',') }))
          history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        }
        else {
          history.push('/')
        }
    }

  return (
    <Grow in>
        <Container maxWidth="xl">
            <Grid container justifyContent='space-between' className={classes.gridContainer} alignItems='stretch' spacing={3}> 
              <Grid item xs={12} sm={6} md={9}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                  <TextField 
                    name='search' 
                    variant='outlined' 
                    label='Search Post'  
                    fullWidth
                    onKeyPress={handleKeyPress}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}

                    />
                    <ChipInput
                      style={{ margin: '10px 0' }}
                      value={tags}
                      onAdd={handleAdd}
                      onDelete={handleDelete}
                      label="Search Tags"
                      variant='outlined'
                      
                    />
                    <Button color='primary' variant='contained' fullWidth onClick={searchPost}>Search Post</Button>
                </AppBar>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
                {( !searchQuery && !tags.length ) && (
                     <Paper  elevation={6}>
                      <Paginate page={page} />
                    </Paper>
                )}
               
              </Grid>
            </Grid>
        </Container>
      </Grow>
  )
}

export default Home