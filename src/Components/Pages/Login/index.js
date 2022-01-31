import React, {useState} from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import {login} from '../../../Redux/Slicer/Authentication';
import {useDispatch} from 'react-redux';
import {setusername} from '../../../Redux/Slicer/AppState';
import {fetchUserByName} from '../../../Redux/Slicer/User';

const defaultValues = {
  username: '',
  password: '',
};

const Creator = process.env.REACT_APP_CREATOR;

const DisabledLink = styled(`button`)(({theme}) => ({
  '&[disabled]': {
    'color': 'grey',
    'cursor': 'default',
    'background': 'none',
    'border': 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props
      }>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/ihsankl">
        {Creator}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
            Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={(e)=> e.preventDefault()}
          noValidate sx={{mt: 1}}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            value={formValues.username}
            onChange={handleInputChange}
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={formValues.password}
            onChange={handleInputChange}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            onClick={() => {
              const data = {
                username: formValues.username,
                password: formValues.password,
              };
              dispatch(login(data));
              dispatch(setusername(formValues.username));
              const username = formValues.username;
              const temp = {username};
              dispatch(fetchUserByName(temp));
            }}
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
              Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                underline='none'
                component={DisabledLink}
                disabled
                href="#"
                variant="body2"
              >
                  Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                onClick={()=> navigate('/register')}
                href="javascript:void(0)"
                variant="body2"
              >
                {'Don\'t have an account? Sign Up'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{mt: 8, mb: 4}} />
    </Container>
  );
};

export default Login;
