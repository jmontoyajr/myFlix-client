import React from 'react';
import Button from 'react-bootstrap/Button';


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
    const { genre, onBackClick } = this.props;

    return (
      <div className="genre-view">
        <div className="movie-genre">
          <span className="label"><strong>Genre: {''}</strong></span>
          <span className="value">{genre.Name}{''}</span>
        </div>
        <hr />
        <div className="genre-description">
          <span className="label"><strong>Description: {''}</strong></span>
          <span className="value">{genre.Description}{''}</span>
        </div>
        <hr />
        <div>
          <Button onClick={() => { onBackClick(null); }} variant="success">Back</Button>
        </div>
      </div>
    );
  }
}