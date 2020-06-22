import React, { Fragment } from 'react';

import Project from './Project';

const ProjectList = ({ projects }) => {
  return (
    <Fragment>
      {projects.map((project) => (
        <Project
          key={project.id}
          id={project.id}
          photo={project.image}
          title={project.title}
          description={project.description}
          tags={project.tags}
        />
      ))}
    </Fragment>
  );
};

export default ProjectList;
