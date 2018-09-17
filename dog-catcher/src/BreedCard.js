import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';

const cardStyle = {
  height: '300px',
  width: '300px',
  border: '1px solid #ABF0F0',
  margin: '8px',
  padding: '8px',
  background: 'white',
  boxShadow: '3px 4px 18px 0px rgba(213,242,242,1)'
}
const imageStyle = (url) => {
  return({
    height: '75%',
    backgroundImage: `url(${url})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    backgroundPostion:'center center'
  })
}
const buttonStyle = {
  width: '100%',
  paddingTop: '10px',
  display: 'flex',
  justifyContent: 'space-around',
}
export default class BreedCard extends Component {
  render() {
    const {favorites, addToFavorites, url, breedName, removeFromData, index} = this.props
    const inFavorites = favorites.includes(url)
    const buttonText = inFavorites ? 'In Favorites' : 'Save to Favorites'
    return (
      <div style={cardStyle}>
        <div style={imageStyle(url)}></div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div>{breedName}</div>
          <div style={buttonStyle}>
            <Button onClick={() => addToFavorites(url)} disabled={inFavorites}> {buttonText}</Button>
            <Button bsStyle="danger" onClick={()=>removeFromData(index)}>Delete</Button>
          </div>
        </div>
      </div>
    );
  }
}