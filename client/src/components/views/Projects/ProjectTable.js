import React from 'react';

const ProjectTable = ({ projects }) => {
  return (
    <div className='Project__Table'>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Stack</th>
            <th>Creator</th>
            <th>Links</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td></td>
              <td>{project.title}</td>
              <td>{project.projectType}</td>
              <td>{project.creator}</td>
              <td>delete</td>
              <td>edit</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
