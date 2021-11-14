import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import logo from '../../img/my-flix.png';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// #0 
import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

// import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// #2 export keyword removed from here
class MainView extends React.Component {

  constructor() {
    super();
    // #3 movies state removed from here
    this.state = {
      user: null
    };
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

  // Adds authorization token to app header
  getMovies(token) {
    axios.get('https://j-flix-app.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // #4 Assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
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

    // #5 movies is extracted from this.props rather than from the this.state
    let { movies } = this.props;
    let { user } = this.state;
    // if no user, logged in view rendered - if logged in, user details passed as a prop to logged in view

    // Before the movies have been loaded

    return (
      <Router>
        <hr />
        <div>
          <img src={logo} width={250} />
          <Link to={`/user/:id`}>
            <Button variant="secondary">Profile</Button>
          </Link>
          <Link to={`/`}>
            <Button variant="success">Movies</Button>
          </Link>
          <Button variant="warning" size="lg" style={{ float: 'right' }} onClick={() => { this.onLoggedOut() }}>Logout</Button>
          <strong><h4>User: {user} </h4></strong>
        </div>

        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <MoviesList movies={movies} />;
          }} />
          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />
          <Route path="/user/:id" render={({ match, history }) => {
            if (movies.length === 0) return <div classsname="main-view" />;
            if (!user) return <Col>
              <ProfileView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            return <Col md={8}>
              <ProfileView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
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

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);

