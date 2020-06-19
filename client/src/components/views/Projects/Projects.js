import React, { Component } from 'react';

import ProjectList from './ProjectList';

class Projects extends Component {
  state = {
    loading: false,
  };
  render() {
    return (
      <section>
        <ProjectList />
      </section>
    );
  }
}

export default Projects;
