import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPenSquare } from '@fortawesome/free-solid-svg-icons';

import Button from '../../common/Buttons/Button';
import { delProject } from '../../../utils/utils';

const ProjectTable = ({ projects }) => {
  return (
    // <div className='Project'>
    <table className='Project__Table'>
      <thead className='Project__Table-head'>
        <tr className='Project__Table-head-row'>
          <th>Title</th>
          <th>Stack</th>
          <th>Creator</th>
          <th>Links</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project._id}>
            <td className='Project__Table-title'>
              <Button to={`/projects/${project._id}`}>{project.title}</Button>
            </td>
            <td className='Project__Table-type'>{project.projectType}</td>
            <td>{project.creator}</td>
            <td className='Project__Table-links'>
              <Button onClick={() => delProject(project._id)}>
                <FontAwesomeIcon icon={faTimes} />
              </Button>
            </td>
            <td className='Project__Table-links'>
              <Button to={`/projects/update/${project._id}`}>
                <FontAwesomeIcon icon={faPenSquare} />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    // </div>
  );
};

export default ProjectTable;
