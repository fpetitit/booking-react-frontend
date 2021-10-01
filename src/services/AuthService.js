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
}

export default new AuthService();
