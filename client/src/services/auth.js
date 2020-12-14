import axios from 'axios';

const signup = (username, password, type) => {
  return axios
    .post('/api/auth/signup', { username, password, type })
    .then(response => {
      return response.data
    })
    .catch(err => {
      return err.response.data;
    });
}

const newParent = (    childFName,
  childSName,
  dob,
  Parent1FName,
  Parent1SName,
  Parent1Phone,
  Parent1Email,
  Parent2FName,
  Parent2SName,
  Parent2Phone,
  Parent2Email,
  homeLanguage,
  specialNeeds,
  specialNeedsDetails) => {
  return axios
    .post('/api/auth/signup', {   childFName,
      childSName,
      dob,
      Parent1FName,
      Parent1SName,
      Parent1Phone,
      Parent1Email,
      Parent2FName,
      Parent2SName,
      Parent2Phone,
      Parent2Email,
      homeLanguage,
      specialNeeds,
      specialNeedsDetails }) // fix
    .then(response => {
      return response.data
    })
    .catch(err => {
      return err.response.data;
    });
}

const login = (username, password) => {
  return axios
    .post('/api/auth/login', { username, password })
    .then(response => {
      return response.data
    })
    .catch(err => {
      return err.response.data;
    });
}

const logout = () => {
  return axios
    .delete('/api/auth/logout')
    .then(response => {
      return response.data
    })
    .catch(err => {
      return err.response.data;
    });

}

export { signup, login, logout, newParent };