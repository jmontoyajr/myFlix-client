import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://j-flix-app.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <Form>
        <Form.Group controlId="formUserName">
          <Form.Label>Username:</Form.Label>
          <Form.Control ref={this.form} type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control ref={this.form} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        </Form.Group>
        <Button variant="success" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
        <hr>
        </hr>
      </Form>
      <Link to={`/register`}><h2>Sign Up!</h2></Link>

    </div >
  );
}