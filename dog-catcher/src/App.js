import React, { Component } from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap'
import Search from './Search'
import BreedList from './BreedList'
import LoadingScreen from './LoadingScreen'

//ToDo:
//create scroll to top
//OOP

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
      chosenBreed: '',
      favorites: [],
      view: 'no-show'
    };
  }
  render() {
    {if (!this.state.loaded){
      this.loadData()
      return <LoadingScreen />
    }}
    
    return (
      <div>
        <Search breeds={this.state.allBreeds} chosenBreed={this.state.chosenBreed} updateChosenBreed={this.updateChosenBreed}/>
        <ButtonToolbar style={{display: 'flex', justifyContent: 'center '}}>
          <Button onClick={this.getRandomBreed}>+ Catch A Random Breed </Button>
          <Button onClick={() => this.setView('favorites')}>View Favorites </Button>
        </ButtonToolbar>
        {this.renderView()}
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

  renderView = () => {
    switch(this.state.view) {
      case 'main-view':
          return this.renderMainView()
          break;
      case 'favorites':
        return this.renderFavorites()
        break;
      default:
        return this.noShowView()
  }
  }
  renderMainView = () => {
    const {chosenBreed, data, favorites} = this.state
    return <BreedList removeFromData={this.removeFromData} addToFavorites={this.addToFavorites} breedName={chosenBreed} data={data} favorites={favorites}/>
  }

  renderFavorites = () => {
    const {chosenBreed, data, favorites} = this.state
    if(favorites){
      return <BreedList removeFromData={this.removeFromData} breedName={chosenBreed} data={favorites} favorites={favorites}/>
    }
    this.noShowView()
  }

  noShowView = () => {
    return( 
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '10px'}}>
      <img width='300px' src='https://static.boredpanda.com/blog/wp-content/uploads/2018/04/sad-dog-madame-eyebrows-english-bulldog-14.gif'/>
      <div>There are currently no breeds caught.Search above to catch some!</div>
    </div>
    )
  }

  updateChosenBreed = (breedName) => {
    this.setState({chosenBreed: breedName, view:'main-view'}, this.loadBreedLinks(breedName))
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
    this.setState({chosenBreed: newBreed, view: 'main-view'}, this.loadBreedLinks(newBreed))
  }
  setView = (view) => {
    this.setState({view: view})
  }
  addToFavorites = (link) => {
    const newFavs = [...this.state.favorites]
    newFavs.push(link)
    console.log(newFavs)
    this.setState({favorites: newFavs})
  }

  removeFromData = (i) => {
    const dataCopy = [...this.state.data]
    dataCopy.splice(i,1)
    this.setState({data: dataCopy})
  }
}


