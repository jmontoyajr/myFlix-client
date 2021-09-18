import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MainView extends React.Component {

  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      user: null
    };
  }

  // Adds authorization token to app header
  getMovies(token) {
    axios.get('https://j-flix-app.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // link to j-flix-app on Heroku
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  // when a useviewr logs in, updates to user property in state that particular user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  // updates state of selected movie to that movie
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, user } = this.state;

    // if no user, logged in view rendered - if logged in, user details passed as a prop to logged in view

    // Before the movies have been loaded


    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (movies.length === 0) return <div className="main-view" />;
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />
          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route path="/directors/:name" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />
          <Route path="/genre/:name" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

        </Row>
      </Router>
    );
  }
}

