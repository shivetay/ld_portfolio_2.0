import React from 'react';

import './Footer.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faDiceFive } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className='Footer'>
      <div className='Footer__Links'>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://www.linkedin.com/in/lukaszdawidowicz/'>
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://github.com/shivetay'>
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://www.fiverr.com/shivetay?public_mode=true'>
          <FontAwesomeIcon icon={faDiceFive} />
        </a>
      </div>
      <div className='Footer__Text'>
        <span>Łukasz Dawidowicz &copy;2020</span>
      </div>
    </footer>
  );
};

export default Footer;
