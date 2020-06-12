import React from 'react';
import { Link } from 'react-router-dom';

import { isAuthUser } from '../../../utils/utils';

import Layout from '../../layout/MainLayout/Layout';

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthUser();

  const adminLinks = () => {
    return (
      <div className=''>
        <h4 className=''>Admin Links</h4>
        <ul className=''>
          <li className='list-group-item'>
            <Link to={`/projects/create/${_id}`} className=''>
              Create Project
            </Link>
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
