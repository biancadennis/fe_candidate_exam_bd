import React, { Component } from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap'
import Search from './Search'
import BreedList from './BreedList'
import LoadingScreen from './LoadingScreen'

async function getAllBreeds() {
  const response = await fetch('https://dog.ceo/api/breeds/list/all')
  const json = await response.json()
  return json
}

async function getChosenBreed(breedName) {
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
          <Button bsStyle='danger' onClick={() => this.setView('no-show')}>Clear All </Button>
        </ButtonToolbar>
        {this.renderView()}
      </div>
    );
  }

  
  loadData = () => {
    if(this.state.loaded){
      this.setState({loaded: false})
    }
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
      case 'favorites':
        return this.renderFavorites()
      default:
        return this.noShowView()
  }
  }
  renderMainView = () => {
    const {chosenBreed, data, favorites} = this.state
    return <BreedList removeFromData={this.removeFromData} addToFavorites={this.addToFavorites} breedName={chosenBreed} data={data} favorites={favorites}/>
  }

  renderFavorites = () => {
    const {chosenBreed, favorites} = this.state
    if(favorites){
      return <BreedList removeFromData={this.removeFromData} breedName={chosenBreed} data={favorites} favorites={favorites}/>
    }
    this.noShowView()
  }

  noShowView = () => {
    return( 
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '100px'}}>
      <div>There are currently no breeds caught. Search above to catch some!</div>
      <img alt='sad dog' style={{boxShadow: '3px 4px 18px 0px rgba(213,242,242,1)'}} width='300px' src='https://static.boredpanda.com/blog/wp-content/uploads/2018/04/sad-dog-madame-eyebrows-english-bulldog-14.gif'/>
    </div>
    )
  }

  updateChosenBreed = (breedName) => {
    this.setState({chosenBreed: breedName, view:'main-view'}, this.loadBreedLinks(breedName))
  }

  loadBreedLinks = (breedName) => {
    if(this.state.loaded){
      this.setState({loaded: false})
    }
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
    const newFavs = [...this.state.favorites, link]
    this.setState({favorites: newFavs})
  }

  removeFromData = (i) => {
    if (this.state.favorites.includes(this.state.data[i])){
      const favoriteArray = this.arrayWithIndexRemoved(this.state.favorites, i)
      this.setState({favorites: favoriteArray})
    }
    const dataArray = this.arrayWithIndexRemoved(this.state.data, i)
    this.setState({data: dataArray})
    
  }

  arrayWithIndexRemoved = (array, index) => {
    const copy = [...array]
    copy.splice(index, 1)
    return copy
  }
}