import React from 'react';
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
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
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
              <Link href="#" variant="body2">
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
