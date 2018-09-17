import React, { Component } from 'react';


export default class LoadingScreen extends Component {
  render() {
    const loadingStyle={
        height:'50%',
        width: '50%',
        display: 'block',
        margin: '100px auto'
    }
    return (
      <img style={loadingStyle} alt='loading' src='https://www.iabc.com/wp-content/uploads/images/loading.gif'/>
    );
  }
}