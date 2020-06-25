import React from 'react';

const FileUpload = (props) => {
  const pickPhoto = (e) => {
    console.log(e.target.value);
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
