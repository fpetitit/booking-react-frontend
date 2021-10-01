import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/';

class SlotService {

  fetchSlots() {
    return axios.get(
      `${API_BASE_URL}slots`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      });
  }
}

export default new SlotService();