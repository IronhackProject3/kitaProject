import axios from 'axios';

const newParent = (    childFName,
  childSName,
  dob,
  boyGirl,
  Parent1FName,
  Parent1SName,
  Parent1Phone,
  Parent1Email,
  Parent2FName,
  Parent2SName,
  Parent2Phone,
  Parent2Email,
  kitaId,
  applications, // add  / push to array of objects and object containing: loggedin id, current kita id, timestamp, , kita priority value
  homeLanguage, 
  specialNeeds,
  
  specialNeedsDetails) => {
  return axios
    .post('/api/auth/signup', {   childFName,
      childSName,
      dob,
      boyGirl,
      Parent1FName,
      Parent1SName,
      Parent1Phone,
      Parent1Email,
      Parent2FName,
      Parent2SName,
      Parent2Phone,
      Parent2Email,
      kitaId,
      applications,
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


export { newParent };