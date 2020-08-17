/* projecs for public Projects.js */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faTerminal } from '@fortawesome/free-solid-svg-icons';

import Button from '../../common/Buttons/Button';
import ShowImage from '../../common/ShowImage/ShowImage';

const ProjectList = ({ projects, className, getOneProj }) => {
  return (
    <Fragment>
      {projects.map((project) => (
        <div className='Projects__Project' key={project._id}>
          {/* <Button to={`/projects/${project._id}`}>
            <h3 className='Projects-name'>{project.title}</h3>
          </Button> */}
          <Button
            to={`/projects/${project._id}`}
            // onClick={() => getOneProj(project._id)}
          >
            <h3 className='Projects-name'>{project.title}</h3>
            <p>{project._id}</p>
          </Button>
          <div className='Projects__Photo'>
            <ShowImage
              className='Projects-photo'
              item={project._id}
              url='project'
            />
          </div>
          <span className='Projects-tech'>{project.tags}</span>
          <p className='Projects-type'>{project.projectType}</p>
          <p className='Projects-descr'>{project.shortDescription}</p>
          <div className='Projects-button'>
            <Button className='' href={project.links.demo}>
              <FontAwesomeIcon icon={faTerminal} />
            </Button>
            <Button className='' href={project.links.git}>
              <FontAwesomeIcon icon={faGithub} />
            </Button>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

ProjectList.propTypes = {
  getOneProj: PropTypes.func,
};

export default ProjectList;
