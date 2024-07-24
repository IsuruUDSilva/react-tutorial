import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Avatar, CssBaseline } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../../validation';
import axios from 'axios';
import { loginErrors } from '../../../validation/signupValidations';

const theme = createTheme();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async(event) => {
    event.preventDefault();
    const newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = 'Email is in an invalid format';
    }

    if (!validatePassword(password)) {
      newErrors.password = 'Password is incorrect';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      const payloadData = {
        email: email,
        password: password,
        returnSecureToken: true,
      };
    
      try {
        const response = await axios.post(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDNzvthLu-nQWlFVv1AdV6t315YJ1C7Jfs',
          payloadData
        );

        if(response.data.idToken) {  
          navigate('/home');
        }
      } catch (error) {
        console.error('Login error:', error);
        const errorMessage = loginErrors(error.response?.data?.error?.message || 'UNKNOWN_ERROR');
        setErrors({loginError: errorMessage});
      }
      
    }

    console.log('Errors:', errors);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ borderRadius: 8, border: '2px solid #000', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)', marginTop: '50px'}} >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {errors.email &&
                <label>{errors.email}</label>
          }
          {errors.password &&
                <label>{errors.password}</label>
          }
          {errors.loginError &&
                <label>{errors.loginError}</label>
          }
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type='email'
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 , background: '#D6EFD8', color: '#1A5319', ":hover": {background: '#1A5319', color:'#D6EFD8'}}}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
