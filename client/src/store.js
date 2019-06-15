import Vue from 'vue';
import Vuex from 'vuex';
import apiUsers from './api/user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    user: {},
    status: ''
  },
  getters: {
    getUserById: state => id => {
      return state.users.find(user => user._id == id);
    }
  },
  mutations: {
    SET_USERS(state, payload) {
      state.users = payload;
    },
    ADD_USER(state, payload) {
      state.users.push(payload);
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_STATUS(state, status) {
      state.status = status;
    },
    DELETE_USER(state, id) {
      state.users = state.users.filter(user => user._id != id);
    }
  },
  actions: {
    getUsers({ commit }) {
      commit('SET_STATUS', 'load');
      return apiUsers.getUsers().then(resp => {
        const users = resp.data;
        commit('SET_STATUS', 'success');
        commit('SET_USERS', users);
        return users;
      });
    },
    createUser({ commit }, payload) {
      commit('SET_STATUS', 'load');
      return new Promise((resolve, reject) => {
        apiUsers
          .createUser(payload)
          .then(resp => {
            const data = resp.data;
            commit('SET_STATUS', 'success');
            commit('ADD_USER', data);
            resolve({
              status: 'success',
              message: 'Пользователь успешно создан',
              id: data._id
            });
          })
          .catch(err => {
            commit('SET_STATUS', 'error');
            reject({ status: 'error', message: `${err}` });
          });
      });
    },
    deleteUser({ commit }, id) {
      return apiUsers.deleteUser(id).then(() => {
        commit('DELETE_USER', id);
      });
    },
    updateUser({ commit }, payload) {
      return apiUsers.updateUser(payload).then(res => {
        const user = res.data;
        commit('DELETE_USER', payload.id);
        commit('ADD_USER', user);
      });
    },
    getUser({ commit, getters }, id) {
      const user = getters.getUserById(id);
      if (user) {
        commit('SET_USER', user);
        return user;
      } else {
        return apiUsers.getUser(id).then(resp => {
          const user = resp.data;
          console.log(user);
          commit('SET_USER', user);
          return user;
        });
      }
    }
  }
});
