import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './AdminDashboard.scss';

import Layout from '../../layout/MainLayout/Layout';
import Button from '../../common/Buttons/Button';
import ProjectListAdmin from '../Projects/ProjectListAdminContainer';

const AdminDashboard = ({ user: { _id, name } }) => {
  const adminLinks = () => {
    return (
      <Fragment>
        <h4 className='Admin__Links-header'>Admin Links</h4>
        <ul className=''>
          <li className='list-group-item'>
            <Button to={`/projects/create/${_id}`} className=''>
              Create Project
            </Button>
          </li>
        </ul>
      </Fragment>
    );
  };

  return (
    <Layout
      title='Admin Dashboard'
      description={`Wlecome ${name}`}
      className=''>
      <div className='Admin'>
        <div className='Admin__Links-content'>
          <div className='Admin__Links'>{adminLinks()}</div>
        </div>

        <div className='Admin__Content'>
          <ProjectListAdmin />
        </div>
      </div>
    </Layout>
  );
};

AdminDashboard.propTypes = {
  isAuth: PropTypes.bool,
  user: PropTypes.object,
};

export default AdminDashboard;

//TODO:
/* chnage to clas component */
