import React, { Component } from 'react';
import {Button} from 'react-bootstrap'
import Search from './Search'
import BreedList from './BreedList'

//create scroll to top
//create object to handle this better
async function getAllBreeds() {
  //need to be able to pass in url
  const response = await fetch('https://dog.ceo/api/breeds/list/all')
  const json = await response.json()
  return json
}

async function getChosenBreed(breedName) {
  //need to be able to pass in url
  const response = await fetch(`https://dog.ceo/api/breed/${breedName}/images`)
  const json = await response.json()
  return json
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      allBreeds: null,
      data: null,
      chosenBreed: ''
    };
  }
  render() {
    {if (!this.state.loaded){
      this.loadData()
      //create better loading page
      return <div>loading...</div>
    }}

    return (
      <div>
        <Search breeds={this.state.allBreeds} chosenBreed={this.state.chosenBreed} updateChosenBreed={this.updateChosenBreed}/>
        <Button onClick={this.getRandomBreed}>+ Catch A Random Breed </Button>
        {this.renderMainView()}
      </div>
    );
  }

  
  loadData = () => {
   this.state.loaded ? this.setState({loaded:false}) : null
   if(!this.state.chosenBreed){
    getAllBreeds().then(
      data => this.setState({allBreeds: data.message, loaded: true})
    ).catch(reason => console.log(reason.message))
  }
  }

  renderMainView = () => {
    const {chosenBreed, data} = this.state
    if(this.state.chosenBreed){
      return <BreedList breedName={chosenBreed} data={data}/>
    }
    return 'There are currently no breeds caught.Search above to catch some!'
  }
  updateChosenBreed = (breedName) => {
    this.setState({chosenBreed: breedName}, this.loadBreedLinks(breedName))
  }

  loadBreedLinks = (breedName) => {
    this.state.loaded ? this.setState({loaded: false}) : null
    getChosenBreed(breedName).then(
      data => this.setState({data: data.message, loaded: true})
    ).catch(reason => console.log(reason.message))
  }

  getRandomBreed = () => {
    const breeds = Object.keys(this.state.allBreeds)
    const index = Math.floor(Math.random() * breeds.length)
    const newBreed = breeds[index]
    this.setState({chosenBreed: newBreed}, this.loadBreedLinks(newBreed))
  }
}


