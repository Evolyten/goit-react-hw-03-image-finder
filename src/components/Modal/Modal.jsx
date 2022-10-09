import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Wrap, BackDrop, Img } from './ModalStyled';

export class Modal extends Component {
  addKeyListener = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.addKeyListener);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.addKeyListener);
  }
  render() {
    const { closeModal, currentImg } = this.props;
    return (
      <BackDrop onClick={closeModal}>
        <Wrap>
          <Img src={currentImg.largeImageURL} alt="" />
        </Wrap>
      </BackDrop>
    );
  }
}

Modal.propTypes = {
  currentImg: PropTypes.object,
};
