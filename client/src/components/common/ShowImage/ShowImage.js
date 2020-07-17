import React from 'react';
import { API_URL } from '../../../config';

const ShowImage = ({ item, url, alt, className }) => {
  return (
    <div>
      <img
        className={className}
        alt={alt}
        src={`${API_URL}/${url}/photo/${item}`}
      />
    </div>
  );
};

export default ShowImage;
