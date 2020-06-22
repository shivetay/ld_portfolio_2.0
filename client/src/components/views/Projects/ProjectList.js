import React, { Fragment } from 'react';

const ProjectList = ({ projects }) => {
  return (
    <Fragment>
      <div>
        {projects.map((project) => (
          <div className='Projects__Project' key={project._id}>
            <h3 className='Projects-name'>{project.title}</h3>
            <img
              className='Projects-photo'
              src={project.photo}
              alt='project_img'
            />
            <span className='Projects-tech'>{project.tags}</span>
            <p className='Projects-descr'>{project.description}</p>
            <div className='Project-button'>
              <button className='btn'>
                <a className='btn-aTag' href={project.links}>
                  Demo
                </a>
              </button>
              <button className='btn'>
                <a className='btn-aTag' href={project.links}>
                  Code
                </a>
              </button>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ProjectList;
