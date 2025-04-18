import React, { useState } from 'react';
import './login.css'; 
import { Link, useNavigate } from 'react-router';

const Login = () => {
  const nav = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) {
      if (
        email === window.localStorage.getItem('email') &&
        password === window.localStorage.getItem('password')
      ) {
        nav('/details');
      } else alert('Invalid Credentials!');
    } else alert('Please complete the details!');
  }

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="login-title">Adaah</h1>

        <label htmlFor="email">Enter Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="pass">Enter Password:</label>
        <input
          id="pass"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Log in</button>
        <p style={{ marginTop: '1rem', fontWeight:"semibold", color: "maroon" }}>
          New Member? <Link to="/signup">Sign Up</Link> here
        </p>
      </form>
    </div>
  );
};

export default Login;
