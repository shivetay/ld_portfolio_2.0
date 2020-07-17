import React, { Fragment } from 'react';

// import './Projects.scss';

import Button from '../../common/Buttons/Button';
import ShowImage from '../../common/ShowImage/ShowImage';

const ProjectList = ({ projects, className }) => {
  return (
    <Fragment>
      {projects.map((project) => (
        <div className='Projects__Project' key={project._id}>
          <Button to={`/projects/${project._id}`}>
            <h3 className='Projects-name'>{project.title}</h3>
          </Button>
          <ShowImage
            className='Projects-photo'
            item={project._id}
            url='project'
          />
          <span className='Projects-tech'>{project.tags}</span>
          <p className='Projects-type'>{project.projectType}</p>
          <p className='Projects-descr'>{project.description}</p>
          <div className='Projects-button'>
            <Button className={className} href={project.links.demo}>
              Demo
            </Button>
            <Button className={className} href={project.links.git}>
              Code
            </Button>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default ProjectList;
