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
  const response = await fetch(`https://dog.ceo/api/breed/${breedName}/images/random`)
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
          <Button bsStyle='danger' onClick={() => this.setView('no-show')}>Clear </Button>
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
      case 'no-show':
        return this.noShowView()
      default:
        return <LoadingScreen />
  }
  }
  renderMainView = () => {
    const {chosenBreed, data, favorites, view} = this.state
    return <BreedList view={view} removeFromData={this.removeFromData} addToFavorites={this.addToFavorites} breedName={chosenBreed} data={data} favorites={favorites}/>
  }

  renderFavorites = () => {
    const {chosenBreed, favorites, view} = this.state
    if(favorites){
      return <BreedList view={'favorites'} removeFromData={this.removeFromData} breedName={chosenBreed} data={favorites} favorites={favorites}/>
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
    let dataUrls = []
    if(this.state.data) {
      dataUrls = this.state.data.map(breed => breed.url)
    }
    if(this.state.loaded){
      this.setState({loaded: false})
    }
    getChosenBreed(breedName).then(
      data => dataUrls.includes(data.message) ? this.getRandomBreed() :  data
    ).then(
      data => this.setState(
        (state) =>({
          data: state.data ? [{breedName: breedName, url: data.message}, ...state.data] : [{breedName: breedName, url: data.message}],
          view: 'main-view',
          loaded: 'true' 
          })
      )
    ).catch(() => this.getRandomBreed())
  }

  getRandomBreed = () => {
    const breeds = Object.keys(this.state.allBreeds)
    const index = Math.floor(Math.random() * breeds.length)
    const newBreed = breeds[index]
    this.setState({chosenBreed: newBreed}, this.loadBreedLinks(newBreed))
  }
  setView = (view) => {
    this.setState({view: view})
  }
  addToFavorites = (newFav) => {
    const newFavs = [newFav, ...this.state.favorites]
    this.setState({favorites: newFavs})
  }

  removeFromData = (i) => {
    const urls = this.state.favorites.map(breed => breed.url)
    if (urls.includes(this.state.data[i].url)){
      const index = urls.indexOf(this.state.data[i].url)
      const favoriteArray = this.arrayWithIndexRemoved(this.state.favorites, index)
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