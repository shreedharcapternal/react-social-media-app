import { AppBar, Typography,Toolbar,Avatar,Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import useStyles from './styles';
import memory from '../../images/ig.png';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';


const NavBar = () => {
  const classes= useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  console.log(user);

  useEffect(() => {
    const token = user?.token;

    if(token) {
        const decodeToken = decode(token)

        if(decodeToken.exp * 1000 < new Date().getTime()) {
            handleLogout();
        }
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const handleLogout = () => {
    dispatch({
        type: 'LOGOUT'
    })
    history.push('/auth');
    setUser(null);

  }

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
        <div className={classes.brandContainer}>
            <Typography component={Link} to='/' className={classes.heading} variant='h2' align='center'>Instagram</Typography>
            <img className={classes.image} src={memory} alt="memory" height="60"  />
        </div>
        <Toolbar className={classes.toolbar} >
            {
                user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                        <Button variant='contained' onClick={handleLogout}  color='secondary'>Sign Out</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' color='primary' variant='contained'>Sign In</Button>
                )
            }
        </Toolbar>  
    </AppBar>
  )
}

export default NavBar