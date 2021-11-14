import React from 'react';
import Button from 'react-bootstrap/Button';


export class DirectorView extends React.Component {

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
    const { director, onBackClick } = this.props;

    return (
      <div>
        <div className="director-view">
          <hr />
          <div className="movie-director">
            <span className="label"><strong>Director: {''}</strong></span>
            <span className="value">{director.Name}{''}</span>
          </div>
          <hr />
          <div className="director-bio">
            <span className="label"><strong>Bio: {''}</strong></span>
            <span className="value">{director.Bio}{''}</span>
          </div>
          <hr />
          <div className="director-birth">
            <span className="label"><strong>Birth: {''}</strong></span>
            <span className="value">{director.Birth}{''}</span>
          </div>
          <hr />
          <div>
            <Button onClick={() => { onBackClick(null); }} variant="success">Back</Button>
          </div>
        </div>
      </div>
    );
  }
}


