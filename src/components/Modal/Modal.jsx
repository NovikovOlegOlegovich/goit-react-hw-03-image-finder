import React, { Component } from 'react';
import { Overlay, ModalImg } from './Modal.styled';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeOnEsc);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeOnEsc);
    document.body.style.overflow = 'visible';
  }

  closeOnEsc = e => {
    if (e.code === 'Escape') {
      this.props.handleAuthModal();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.handleAuthModal();
    }
  };

  render() {
    return (
      <Overlay onClick={this.handleBackdropClick}>
        <ModalImg>
          <img src={this.props.currentImg} alt="" />
        </ModalImg>
      </Overlay>
    );
  }
}
export default Modal;
