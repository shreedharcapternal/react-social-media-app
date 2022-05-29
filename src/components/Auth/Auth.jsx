import React, { useState } from 'react'
import { Avatar,Button,Paper,Grid,Typography,Container, TextField } from '@material-ui/core';
import useStyles from './Styles';
import LockOutLinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input';
import { GoogleLogin } from 'react-google-login';
import Icon from './icon'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';

const Auth = () => {

const dispatch = useDispatch();
const history = useHistory()
const classes = useStyles();
const [isSignup,setIsSignup] = useState(false);
const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const [formData,setFormData] = useState(initialState)

const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if(isSignup) {
        dispatch(signup(formData,history));
        console.log("hello dis")
    }
    else {
        dispatch(signin(formData,history));
    }
}

const handleChange = (e) => {
    setFormData({ ...formData,[e.target.name]: e.target.value });
}

const handleShowPassword = () => {
    setShowPassword((prevShowpassword) => !prevShowpassword);
}

const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
   
}

const googleSuccess = async (res) => {
    //console.log(res);
    const result = res?.profileObj; //undefined if it doen't thow op
    const token  = res?.tokenId;

    try {
        dispatch({
            type: 'AUTH',
            data: {
                result,
                token
            }
        })
        history.push('/');
    } catch (error) {
        console.log(error)
    }

}
const googleFailure = async (error) => {
    console.log(error)
}

const [showPassword,setShowPassword] = useState(false);

  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutLinedIcon />
            </Avatar>
            <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                    { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                </Grid>
                 <Button type="submit" fullWidth variant='contained' color='primary' className={classes.submit}>
                    { isSignup ? 'Sign Up' : 'Sign In' }
                </Button>
                <GoogleLogin
                    clientId="767571346748-m501uld8h5al006m1g0dlc7o3fberqpp.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <Button 
                            className={classes.googleButton} 
                            fullWidth 
                            color="primary" 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled}
                            startIcon={<Icon />} 
                            variant="contained">
                                Google Sign In
                        </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}

                />
               
                <Grid container justifyContent='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            { isSignup ? "Already have an account? Sign In" : "Don't Have and account? Sign Up" }
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth