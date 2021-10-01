import { AccordionSummary } from '@material-ui/core';
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

  bookSlot(slotId) {
    return axios.post(
      `${API_BASE_URL}slots/book/${slotId}`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      }
    )
  }

  unbookSlot(slotId) {
    return axios.post(
      `${API_BASE_URL}slots/unbook/${slotId}`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      }
    )
  }
}

export default new SlotService();