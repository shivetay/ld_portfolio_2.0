import React from 'react';
import { API_URL } from '../../../config';

const ShowImage = ({ item, url }) => {
  return (
    <div>
      <img src={`${API_URL}/${url}/photo/${item}`} />
    </div>
  );
};

export default ShowImage;
