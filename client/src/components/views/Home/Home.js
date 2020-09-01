import React from 'react';

import photo from '../../../Images/ld_photo.JPG';

import Navigation from '../Navigation/Navigation';

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
          <p className='Home__Content-paragraph'>
            Hi, I am Łukasz and I am an{' '}
            <span className='Home__Content-span'>
              aspiring Front end Developer.{' '}
            </span>{' '}
            I like to work with{' '}
            <span className='Home__Content-span'>
              HTML, CSS, JavaScript, React, Node.js, Express and MongoDB.{' '}
            </span>{' '}
            As an ambitious person I do not take anything for granted. I am
            fully aware of my strengths and limitations, and with full
            commitment and hard work I can easily fit into any team work style.
            {/*I am not
            afraid to take responsibilities for my actions. As a team player I
            am always trying to provide any help that I can for my team mates,
            as We are working in one team for common goal. */}
          </p>
          <nav className='Home__Content-nav'>
            Feel free to check My{' '}
            <span className='Home__Content-span'>
              <Navigation
                path='projects'
                name='projects'
                className='Home__Nav Home__Nav-link'
              />
            </span>{' '}
            and{' '}
            <span className='Home__Content-span'>
              <Navigation
                path='contact'
                name='contact'
                className='Home__Nav Home__Nav-link'
              />
            </span>{' '}
            me.
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Home;
