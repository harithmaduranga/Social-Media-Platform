import React, { useState } from 'react';
import { TextField, Button, Typography, Container, CssBaseline } from '@mui/material';
import axios from 'axios';

const LoginForm = ({ switchForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users/');
      console.log(response);
      const users = response.data;
      console.log(users);
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        // Successfully logged in
        setErrorMessage('');
        console.log('Logged in:', user);
        localStorage.setItem('current_user', JSON.stringify(user));
        window.location.href = 'home';
      } else {
        // Login details do not match
        setErrorMessage('User not found. Please check your email and password.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {errorMessage && (
            <Typography variant="body2" color="error">
              {errorMessage}
            </Typography>
          )}
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button fullWidth onClick={switchForm}>
            Don't have an account? Register
          </Button>
        </form>
      </div>
    </Container>
  );
};

const RegisterForm = ({ switchForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:8000/users/', { email, password });
      console.log('Registered successfully');
      setErrorMessage('');
    } catch (error) {
      console.error('Error:', error);
      if (error.response.status === 400 && error.response.data === 'Email is already registered.') {
        setErrorMessage('Email is already registered.');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {errorMessage && (
            <Typography variant="body2" color="error">
              {errorMessage}
            </Typography>
          )}
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleRegister}
          >
            Register
          </Button>
          <Button fullWidth onClick={switchForm}>
            Already have an account? Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

const Auth = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const switchForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <div>
      {isLoginForm ? <LoginForm switchForm={switchForm} /> : <RegisterForm switchForm={switchForm} />}
    </div>
  );
};

export default Auth;
