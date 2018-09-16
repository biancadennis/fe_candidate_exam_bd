import React, { Component } from 'react';
import BreedCard from './BreedCard'

export default class BreedList extends Component {
  render() {
      const {data, breedName} = this.props
    return (
      <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around',flexWrap:'wrap'}}>
      {data.map(link => {
        return <BreedCard key={link} url={link} breedName={breedName}/>
      })}
      </div>
    );
  }
}