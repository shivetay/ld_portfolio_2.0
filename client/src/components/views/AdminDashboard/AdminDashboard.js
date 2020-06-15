import React from 'react';

import { isAuthUser } from '../../../utils/utils';

import Layout from '../../layout/MainLayout/Layout';
import Button from '../../common/Buttons/Button';

const AdminDashboard = () => {
  const {
    user: { _id, name },
  } = isAuthUser();

  const adminLinks = () => {
    return (
      <div className=''>
        <h4 className=''>Admin Links</h4>
        <ul className=''>
          <li className='list-group-item'>
            <Button to={`/projects/create/${_id}`} className=''>
              Create Project
            </Button>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title='Admin Dashboard'
      description={`Wlecome ${name}`}
      className=''>
      <div className=''>
        <div className=''>{adminLinks()}</div>
        <div className=''></div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;

//TODO:
/* chnage to clas component */
