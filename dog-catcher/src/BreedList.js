import React, { Component } from 'react';
import BreedCard from './BreedCard'

export default class BreedList extends Component {
  render() {
    const {data, breedName, addToFavorites, favorites, removeFromData} = this.props
    return (
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '10px'}}>
        <div>Caught Breeds</div>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around',flexWrap:'wrap'}}>
          {data.map((link, i) => {
            console.log()
            return <BreedCard removeFromData={removeFromData} addToFavorites={addToFavorites} favorites={favorites} key={link} url={link} breedName={breedName} index={i}/>
          })}
        </div>
      </div>
    );
  }
}