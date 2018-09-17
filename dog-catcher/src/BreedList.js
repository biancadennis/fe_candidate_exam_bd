import React, { Component } from 'react';
import BreedCard from './BreedCard'

export default class BreedList extends Component {
  render() {
    const {data, addToFavorites, favorites, removeFromData, view} = this.props
    return (
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '10px'}}>
        <div>{view === 'favorites' ? 'Favorites' : 'Caught Breeds'}</div>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around',flexWrap:'wrap'}}>
          {data.map((breed, i) => {
            console.log()
            return <BreedCard removeFromData={removeFromData} breed={breed} addToFavorites={addToFavorites} favorites={favorites} key={breed.url} url={breed.url} breedName={breed.breedName} index={i}/>
          })}
        </div>
      </div>
    );
  }
}