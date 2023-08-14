import axios from 'axios';
import UserContext from './UserContext';

export const UserProvider = (props) => {
  const baseUrl = 'http://localhost:3001/api/users/';

  function createUser(username, password, firstName, lastName, email, phoneNumber) {
    let user = { username, password, firstName, lastName, email, phoneNumber };

    return axios.post(baseUrl, user).then((response) => {
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function signInUser(username, password) {
    let user = { username, password };

    return axios.post(`${baseUrl}login`, user).then((response) => {
      localStorage.setItem('myUserToken', response.data.token);
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function getUser(userId) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem('myUserToken')}`,
    };

    return axios.get(baseUrl + userId, { headers: myHeaders }).then((response) => {
      return new Promise(resolve => resolve(response.data));
    });
  }

  function editUser(userId, username, email, phoneNumber) {
    let user = { username, email, phoneNumber };

    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem('myUserToken')}`,
    };
    return axios.put(baseUrl + userId, user, { headers: myHeaders }).then((response) => {
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function signOutUser() {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem('myUserToken')}`,
    };

    return axios.post(baseUrl + 'signout', null, { headers: myHeaders }).then((response) => {
      localStorage.removeItem('myUserToken', response.data.token);
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function deleteUser(userId) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem('myUserToken')}`,
    };

    return axios.delete(baseUrl + userId, { headers: myHeaders }).then((response) => {
      localStorage.removeItem('myUserToken', response.data.token);
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function verifyUser() {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem('myUserToken')}`
    };
    
    return axios.get(baseUrl + "verifyuser", { headers: myHeaders }).then(response => {
        return new Promise(resolve => resolve(response.data))}).catch((error) =>
        new Promise((_, reject) => reject(error.response.statusText))
      )
  }

  return (
    <UserContext.Provider
      value={{
        signOutUser,
        createUser,
        signInUser,
        getUser,
        editUser,
        deleteUser,
        verifyUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
