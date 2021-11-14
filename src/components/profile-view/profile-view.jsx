import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export function ProfileView(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, email, birthday, password);
    // send request to server for authentication
    axios.put('https://j-flix-app.herokuapp.com/users', {
      Username: username,
      Email: email,
      Birthday: birthday,
      Password: password

    })
    /* Get authorization token */
    axios.put('https://j-flix-app.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch(e => {
        console.log('error registering the user')
      });
    // then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };

  return (
    <div>
      <h1>Update Profile</h1>
      <Form>

        <Form.Group controlId="formUserName">
          <Form.Label>Username: </Form.Label>
          <Form.Control ref={this.form} type="text" placeholder="" value={username} onChange={e => setUsername(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control ref={this.form} type="email" placeholder="" value={email} onChange={e => setEmail(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control ref={this.form} type="birthday" placeholder="" value={birthday} onChange={e => setBirthday(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control ref={this.form} type="password" placeholder="" value={password} onChange={e => setPassword(e.target.value)} required />
        </Form.Group>

        <Button variant="success" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
        <hr>
        </hr>
      </Form>
      <Link to={`/`}><h2>Done</h2></Link>

    </div >
  );
}