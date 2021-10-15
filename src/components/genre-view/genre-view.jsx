import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


export class GenreView extends React.Component {

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
    const { movie, onBackClick } = this.props;

    return (
      <div className="genre-view">
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
        <div className="movie-genre">
          <span className="label"><strong>Genre: {''}</strong></span>
          <span className="value">{movie.Genre.Name}{''}</span>
        </div>
        <hr />
        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
        </Link>
        <hr />
        <div>
          <Button onClick={() => { onBackClick(null); }} variant="success">Back</Button>
        </div>
      </div>
    );
  }
}