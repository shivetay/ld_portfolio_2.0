import React from 'react';

const ProjectList = ({ projects }) => {
  return (
    <section>
      <ul>
        {projects.map((project) => {
          console.log('id', project._id);
          return <h1 key={project._id}>{project.title}</h1>;
        })}
      </ul>
    </section>
  );
};

export default ProjectList;
