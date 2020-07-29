import { API_URL } from '../config';
import axios from 'axios';

export const signOut = async (e) => {
  e.preventDefault();
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt');
    return await fetch(`${API_URL}/logout`, { method: 'GET' }).then((res) => {
      return res.json();
    });
  }
};

export const delProject = async (id) => {
  const { token } = isAuthUser();
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };
  try {
    // eslint-disable-next-line
    const res = await axios.delete(`${API_URL}/projects/delete/${id}`, config);
    window.location.reload(false);
  } catch (err) {}
};

export const authenticateUser = (data) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
  }
};

//check if user is auth and there is jwt item in localstorage. menu render
export const isAuthUser = () => {
  try {
    if (typeof window == 'undefined') {
      return false;
    }
    if (localStorage.getItem('jwt')) {
      return JSON.parse(localStorage.getItem('jwt'));
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

export const authHeader = (token) => {
  // return authorization header with jwt token
  console.log(token, 'token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
