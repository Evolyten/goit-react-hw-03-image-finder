import React from 'react';
import PropTypes from 'prop-types';

import { Wrap, BackDrop, Img } from './ModalStyled';
export const Modal = ({ currentImg, closeModal }) => (
  <BackDrop onClick={closeModal}>
    <Wrap>
      <Img src={currentImg.largeImageURL} alt="" />
    </Wrap>
  </BackDrop>
);

Modal.propTypes = {
  currentImg: PropTypes.object,
};
