// import ImageGalleryItem from '../ImageGalleryItem';
// import Loader from '../Loader';

import React, { Component } from 'react';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import { Wrapper } from './App.styled';
// import { getIMG } from '../../API';

export class App extends Component {
  state = { searchWord: '' };

  onSubmit = searchWord => {
    this.setState({ searchWord: searchWord });
  };

  render() {
    return (
      <Wrapper>
        <Searchbar onSubmit={this.onSubmit}></Searchbar>
        <ImageGallery searchWord={this.state.searchWord} />
      </Wrapper>
    );
  }
}
