import React, { Component } from 'react';
import BreedCard from './BreedCard'

export default class BreedList extends Component {
  render() {
      const {breed, breedName} = this.props
    return (
      <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around',flexWrap:'wrap'}}>
      {breed.map(link => {
        return <BreedCard key={link} url={link} breedName={breedName}/>
      })}
      </div>
    );
  }

  getList = () => {
    this.props.breed.map(link =>{
      // return <BreedCard key={link} url={link} />
    
    })
  }
}