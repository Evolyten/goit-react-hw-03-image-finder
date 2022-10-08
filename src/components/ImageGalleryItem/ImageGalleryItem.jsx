import React from 'react';
import PropTypes from 'prop-types';
import { Img, Item } from './ImageGalleryItemStyled';

export const ImageGalleryItem = ({ userData, userPick }) => {
  return (
    <Item>
      <Img
        loading="lazy"
        src={userData.webformatURL}
        onClick={() => userPick(userData.id)}
      />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  userData: PropTypes.object,
};
