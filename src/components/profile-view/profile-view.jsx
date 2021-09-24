import React, { useState } from 'react';
import axios from 'axios';

export function ProfileView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // send request to server for authentication
    axios.put('https://j-flix-app.herokuapp.com/users', {
      Username: username,
      Password: password,
    })
    /* Get authorization token */
    axios.get('https://j-flix-app.herokuapp.com/movies', {
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
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">
          Submit
        </button>
      </label>
    </form>
  );
}