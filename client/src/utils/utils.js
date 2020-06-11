import { API_URL } from '../config';

export const signOut = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt');
    return fetch(`${API_URL}/logout`, { method: 'GET' }).then((res) => {
      console.log('signout', res);
    });
  }
};

export const authenticateUser = (data) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
  }
};

//check if user is auth and there is jwt item in localstorage. menu render
export const isAuthUser = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'));
  } else {
    return false;
  }
};
