import React, { Fragment } from 'react';

import { isAuthUser } from '../../../utils/utils';

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
        <h4 className=''>Admin Links</h4>
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
      <Fragment>
        <div className=''>{adminLinks()}</div>
        <div className=''>
          <ProjectListAdmin />
        </div>
      </Fragment>
    </Layout>
  );
};

export default AdminDashboard;

//TODO:
/* chnage to clas component */
