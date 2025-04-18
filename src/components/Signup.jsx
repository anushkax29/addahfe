import React, { useState } from 'react';
import './signup.css'; 
import { globalContext } from './globalContext';
import { useNavigate } from 'react-router';

const Signup = () => {
  const nav = useNavigate()
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  const {setAuth} = React.useContext(globalContext)

  function handleSubmit(e){
    e.preventDefault();
    if(email && password && confPassword){
      if(password === confPassword){
        window.localStorage.setItem("email", email);
        window.localStorage.setItem("password", password);
        setAuth(true);
        nav(`/details/${name}`)
      }
      else alert("Passwords don't match!")
    }
    else alert("Missing credentials!")
  }
  return (
    <div className="signup-wrapper">
      <form onSubmit={handleSubmit} className="signup-form">
        <h1 className="signup-title">Adaah</h1>

        <label htmlFor='email'>Enter Email:</label>
        <input
          id='email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='name'>Enter Name:</label>
        <input
          id='name'
          type='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor='pass'>Enter Password:</label>
        <input
          id='pass'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor='confirm'>Confirm Password:</label>
        <input
          id='confirm'
          type='password'
          value={confPassword}
          onChange={(e) => setConfPassword(e.target.value)}
        />

        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
