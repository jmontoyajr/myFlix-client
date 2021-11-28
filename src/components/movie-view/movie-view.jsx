import React from 'react';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { movie, onBackClick, addFavorite } = this.props;

    console.log(movie, "movie")
    console.log(addFavorite)

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
          <hr />
        </div>
        <div className="movie-title" as="h2">
          <span className="label"><strong>Title: {''}</strong></span>
          <span className="value">{movie.Title}{''}</span>
        </div>
        <hr />
        <div className="movie-description">
          <span className="label"><strong>Synopsis: {''}</strong></span>
          <span className="value">{movie.Description}{''}</span>
        </div>
        <hr />
        <div>
          <Link to={`/directors/${movie.Director.Name}`}>Director</Link>
        </div>
        <hr />
        <div>
          <Link to={`/genre/${movie.Genre.Name}`}>Genre</Link>
        </div>
        <hr />

        <div>
          <Button onClick={() => { onBackClick(null); }} variant="success">Back</Button>
        </div>
        <div>
          <Button onClick={() => { addFavorite(movie._id); }} variant="warning">Favorite</Button>
        </div>
      </div>

    );
  }
}


