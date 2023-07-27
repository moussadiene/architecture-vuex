import AuthService from '../services/auth.service';
import Swal from "sweetalert2";

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {
  status: { loggedIn: true }, user
} : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state:{
    loggedIn: false,
    user: user
  },
  actions: {

   
    reinitialiser({ commit }, user) {
      return AuthService.reinitialiser(user).then(
        user => {
          return Promise.resolve(user);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }, user) {
      AuthService.logout(user);
      commit('logout');

    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    update({ commit }, data) {
      console.log("====== user ========")
      return AuthService.update(data.user).then(
        response => {
          commit('updatePicSuccess', response.data);
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },

  },
  mutations: {

    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
      console.log(state)
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
      localStorage.removeItem('user');
    },
    registerSuccess(state) {
      // state.status.loggedIn = false;
    },
    registerFailure(state) {
      // state.status.loggedIn = false;
    },
    updatePicSuccess(state, user) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Mise a jour réussit',
        showConfirmButton: false,
        timer: 1000
      })
      localStorage.removeItem('user');
      state.user = user
      localStorage.setItem('user', JSON.stringify(user));
    },

  }
};