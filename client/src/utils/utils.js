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
