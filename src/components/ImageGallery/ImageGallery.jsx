import React from 'react';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageList } from './ImageGaleryStyled';

export function ImageGalleryList({ userImages, userClickModal }) {
  return (
    <ImageList>
      {userImages.map(img => (
        <ImageGalleryItem
          key={img.id}
          userData={img}
          userPick={userClickModal}
        />
      ))}
    </ImageList>
  );
}

ImageGalleryList.propTypes = {
  userData: PropTypes.array,
};
