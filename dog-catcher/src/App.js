import React, { Component } from 'react';
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
      data: null,
      chosenBreed: null
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
        <Search breeds={this.state.data} chosenBreed={this.state.chosenBreed} updateChosenBreed={this.updateChosenBreed}/>
        {this.renderMainView()}
      </div>
    );
  }

  
  loadData = () => {
   this.state.loaded ? this.setState({loaded:false}) : null

    //<BreedList breedName={'hound'} breed={this.state.data}/>
    getAllBreeds().then(
      data => this.setState({data: data.message, loaded: true})
    ).catch(reason => console.log(reason.message))
  }
  renderMainView = () => {
    const {chosenBreed, data} = this.state
    if(this.state.chosenBreed){
      return <BreedList breedName={chosenBreed} breed={data}/>
    }
    return 'There are currently no breeds caught.Search above to catch some!'
  }
  updateChosenBreed = (breedName) => {
    this.setState({chosenBreed: breedName})
    this.loadData('breedName')
  }
}


