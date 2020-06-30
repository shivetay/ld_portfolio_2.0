import React from 'react';

const FileUpload = (props) => {
  const pickPhoto = (e) => {
    let pickedPhoto;

    if (e.target.files && e.target.files.length === 1) {
      console.log('photo', e.target);
      pickedPhoto = e.target.files[0];
      console.log('poto', e.target.files[0]);
    }
    console.log('photo 2', e.target.files[0]);
  };
  return (
    <div>
      <input
        id={props.id}
        type='file'
        accept='.jpg, .png, .jpeg'
        onClick={pickPhoto}
      />
    </div>
  );
};

export default FileUpload;
