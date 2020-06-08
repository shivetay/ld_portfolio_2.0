import React from 'react';

import photo from '../../../Images/ld_photo.JPG';

import './Home.scss';

const Home = () => {
  return (
    <section className='Home'>
      <div className='Home__Container'>
        <div className='Home__Content'>
          <img
            src={photo}
            alt='photo_lukasz_dawidowicz'
            className='Home__Content-img'
          />
          <span>
            <span className='Home__Content-span'>
              I have 5 years experience in IT.{' '}
            </span>{' '}
            Add content{' '}
            <strong>
              JavaScript, HTML, CSS, React, Node.js, Express and MongoDB
            </strong>
            Add content
          </span>
          <br />
          <span>
            <span className='Home__Content-span'>
              During my 13 years of work experience,{' '}
            </span>{' '}
            Ad content -> menu here
          </span>
        </div>
      </div>
    </section>
  );
};

export default Home;
