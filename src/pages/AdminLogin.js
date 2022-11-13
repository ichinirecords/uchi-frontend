import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  input: {
    '&::placeholder': {
      fontFamily: "EB Garamond",
      fontSize: "1.2em"
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AdminLogin = ({setUser}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();

  let history = useHistory();
  
  //Send a post api request to login admin
  const handleLogin = (e) => {
	e.preventDefault();
	fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username: username, password: password}),
    })
    .then(res => {
		if (res.status === 401) {
			return "Unauthorised"
		} else {
			return res.json()
		}
	})
    .then(data => {
		if (data.username) {
			setUser(data);
			history.push("/admin");
		} else {
			alert("incorrect login details");
		}		
	})
  }

  const Copyright = () => {
    return (
      <Typography variant='body2' color='textSecondary' align='center'>
        {'Copyright © '}
        <Link color='inherit' href='https://material-ui.com/'>
          Uchi
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  };

  return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Admin Login
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              InputProps={{
                classes: { input: classes.input }
              }}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='username'
              placeholder='Username'
              name='username'
              autoComplete='username'
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              InputProps={{
                classes: { input: classes.input }
              }}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              placeholder='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type='submit'
			        id='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='/request-reset' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
  );
};

export default AdminLogin;
