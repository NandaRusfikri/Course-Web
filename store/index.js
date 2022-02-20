import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null,
      token: null,
      token_fcm: null,
      dialog: false,
      id_prospect : null,
      header : null,
      sub_header : null,
      snackbar: { color: "", message: null, enabled: false }
    },
    mutations: {
      SET_TOKEN_FCM(state, token_fcm) {
        state.token_fcm = token_fcm;
      },
      SET_USER(state, user) {
        state.user = user;
      },
      SET_IdProspect(state, id_prospect) {
        state.id_prospect = id_prospect;
      },
      SET_TOKEN(state, token) {
        state.token = token;
      },
      SET_DIALOG(state, dialog) {
        state.dialog = dialog;
      },
      SET_SNACKBAR(state, snackbar) {
        state.snackbar = snackbar;
      },
      SET_HEADER(state, header) {
        state.header = header;
      },
      SET_SUB_HEADER(state, sub_header) {
        state.sub_header = sub_header;
      }
    },
    getters: {
      Snackbar: state => {
        return state.snackbar;
      },
      Header: state => {
        return state.header;
      },
      SubHeader: state => {
        return state.sub_header;
      },
      IdProspect: state => {
        return state.id_prospect;
      },
      TokenFcm: state => {
        return state.token_fcm;
      }
    },
    actions: {
      store_token({ commit }, token) {
        commit("SET_TOKEN", token);
      }
    }
  });
};

export default createStore;

