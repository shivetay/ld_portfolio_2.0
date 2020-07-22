import React, { Fragment } from 'react';

import { isAuthUser } from '../../../utils/utils';

import './AdminDashboard.scss';

import Layout from '../../layout/MainLayout/Layout';
import Button from '../../common/Buttons/Button';
import ProjectListAdmin from '../Projects/ProjectListAdmin';

const AdminDashboard = () => {
  const {
    user: { _id, name },
  } = isAuthUser();

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
        <div className='Admin__Links'>{adminLinks()}</div>
        <div className='Admin__Content'>
          <ProjectListAdmin />
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;

//TODO:
/* chnage to clas component */
