import React, { Component } from 'react';
import {Image, Col} from 'react-bootstrap'

const cardStyle = {
  height: '300px',
  width: '300px',
  border: '1px solid gray',
  margin: '5px',
  padding: '5px'
}
const imageStyle = (url) => {
  return({
    height: '75%',
    backgroundImage: `url(${url})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%'
  })
}
export default class BreedCard extends Component {
  render() {
    return (
      <div style={cardStyle}>
        <div style={imageStyle(this.props.url)}></div>
        <div>{this.props.breedName}</div>
      </div>
    );
  }
}