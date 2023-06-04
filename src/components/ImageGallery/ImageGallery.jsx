import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IMGGallery } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal';
import Button from '../Button';
import { getIMG } from '../../API';

const STATUS = {
  images: [],
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends Component {
  state = {
    images: [],
    status: STATUS.IDLE,
    error: '',
    currentPage: 1,
    totalPage: 0,
    imgOnPage: 12,
    modalIsVisible: false,
  };

  componentDidMount() {
    this.setState({
      images: [],
      status: STATUS.IDLE,
      error: '',
      currentImg: '',
      currentPage: 1,
      totalPage: 0,
      imgOnPage: 12,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchWord !== this.props.searchWord) {
      this.setState({
        status: STATUS.PENDING,
        currentPage: 1,
        images: [],
      });
      this.fetchIMG();
    }

    if (prevState.currentPage !== this.state.currentPage) {
      this.fetchIMG();
    }
  }

  async fetchIMG() {
    try {
      const images = await getIMG(
        this.props.searchWord,
        this.state.currentPage
      );

      if (!images.total) {
        throw new Error('No matches found');
      }

      const CalctotalPage = Math.ceil(images.total / 12);

      this.setState({
        images: [...this.state.images, ...images.hits],
        status: STATUS.RESOLVED,
        totalPage: CalctotalPage,
      });
    } catch (error) {
      this.setState({ error: error.message, status: STATUS.REJECTED });
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  handleAuthModal = () => {
    this.setState({ modalIsVisible: !this.state.modalIsVisible });
  };

  handleClickOnImg = largeImageURL => {
    this.handleAuthModal();
    this.setState({ currentImg: largeImageURL });
  };

  render() {
    const { images, status, currentPage, totalPage, currentImg } = this.state;

    const showLoadMoreButton = images.length !== 0 && currentPage < totalPage;

    if (status === STATUS.PENDING) {
      return <p>Loading..</p>;
    }

    if (status === STATUS.RESOLVED) {
      return (
        <>
          <IMGGallery>
            {images.map(({ webformatURL, id, largeImageURL }) => (
              <ImageGalleryItem
                largeImageURL={largeImageURL}
                handleClickOnImg={this.handleClickOnImg}
                webformatURL={webformatURL}
                key={id}
              />
            ))}
          </IMGGallery>
          {showLoadMoreButton && <Button handleClick={this.handleLoadMore} />}
          {this.state.modalIsVisible && (
            <Modal
              handleAuthModal={this.handleAuthModal}
              currentImg={currentImg}
            />
          )}
        </>
      );
    }

    if (status === STATUS.REJECTED) {
      return <p>Error</p>;
    }
  }
}

ImageGallery.propTypes = {
  searchWord: PropTypes.string.isRequired,
};

export default ImageGallery;
