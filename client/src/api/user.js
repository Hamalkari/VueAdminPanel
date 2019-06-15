import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/users'
});

export default {
  getUsers() {
    return instance.get();
  },
  getUser(id) {
    return instance.get(`/${id}`);
  },
  createUser(payload) {
    return instance.post('/create', payload);
  },
  deleteUser(id) {
    return instance.delete(`/delete/${id}`);
  },
  updateUser(payload) {
    return instance.put(`/update/${payload.id}`, payload);
  }
};
