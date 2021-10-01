import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/';

class AuthService {

  login(credentials) {
    return axios.post(API_BASE_URL + "auth/login", credentials);
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem("userInfo"));
  }

  getAuthHeader() {
    return { headers: { Authorization: 'Bearer ' + this.getUserInfo().token } };
  }

  logOut() {
    localStorage.removeItem("userInfo");
    return axios.post(API_BASE_URL + 'logout', {}, this.getAuthHeader());
  }

  fetchUserInfos() {
    return axios.get(
      `${API_BASE_URL}profile`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      });
  }
}

export default new AuthService();
