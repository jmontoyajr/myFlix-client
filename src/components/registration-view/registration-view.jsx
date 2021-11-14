import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    // send request to server for authentication
    axios.post('https://j-flix-app.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })

      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch(e => {
        console.log('error registering the user')
      });

  };

  return (
    <div>
      <h1>Sign Up</h1>
      <Form>
        <Form.Group controlId="formUserName">
          <Form.Label>Username:</Form.Label>
          <Form.Control ref={this.form} type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control ref={this.form} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control ref={this.form} type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control ref={this.form} type="birthday" placeholder="dd/mm/yyyy" value={birthday} onChange={e => setBirthday(e.target.value)} required />
        </Form.Group>

        <Button variant="success" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
        <hr>
        </hr>
      </Form>
      <Link to={`/`}><h1>Login</h1></Link>

    </div>
  );
}