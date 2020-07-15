import React from 'react';
import { API_URL } from '../../../config';

const ShowImage = ({ item, url, alt }) => {
  return (
    <div>
      <img alt={alt} src={`${API_URL}/${url}/photo/${item}`} />
    </div>
  );
};

export default ShowImage;
