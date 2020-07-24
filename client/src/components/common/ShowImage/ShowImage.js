import React, { Fragment } from 'react';
import { API_URL } from '../../../config';

const ShowImage = ({ item, url, alt, className }) => {
  return (
    <Fragment>
      <img
        className={className}
        alt={alt}
        src={`${API_URL}/${url}/photo/${item}`}
      />
    </Fragment>
  );
};

export default ShowImage;
