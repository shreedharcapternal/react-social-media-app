import React, { useEffect, useState } from 'react'
import { Container,AppBar,Typography,Grow,Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter as Router,Switch,Route, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {

  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <Router>
      <Container maxWidth="xl">
        <NavBar />
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/posts" />} />
            <Route path="/posts" exact component={Home} />
            <Route path="/posts/search" exact component={Home} />
            <Route path="/posts/:id" component={PostDetails} />
            <Route path="/auth" component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
          </Switch> 
      </Container>
    </Router>
    
  )
}

export default App