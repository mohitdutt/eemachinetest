import { createStore } from 'vuex';
import axios from 'axios';
const serverURL = "http://localhost:3000/api";
export default createStore({
    namespaced: true,
    state: {
        sideBarData :  {
            state: false, 
            actions: ""
        },
        shifts: {
            title: "",
            description: "",
            date: "",
            startTime: "",
            endTime: "",
            type: "",
            price: ""
        },
        shiftsArray: []
    },
  mutations: {
    UPDATE_SIDEBAR_DATA(state, payload) {
        state.sideBarData = payload;
    },
    SAVE(state, payload){
        state.shiftsArray =  payload
    },
    EDITSHIFTS(state, payload){
        state.shifts = payload
    }
  },
  actions: {
    updateSideBarData({ commit }, payload) {
        commit('UPDATE_SIDEBAR_DATA', payload);
    },
    save({ commit }, payload) {
        axios.post(`${serverURL}/saveData`, {
        body: payload
      })
      commit('SAVE', payload);
    },
    async fetchData({commit}){
      await axios.get(`${serverURL}/getData`)
        .then(response => {   
        commit('SAVE', response.data.data);  
      })
      .catch(e => {
        console.log("error", e)
      })
    },

    async fetchDataById({commit}, payload){
        await axios.get(`${serverURL}/getDataById/${payload.id}`)
      .then(response => {           
        commit('EDITSHIFTS', response.data.data);  
      })
      .catch(e => {
        console.log("error", e)
      })
    }
  },
  getters: {
    getSideBarData(state) {
        return state.sideBarData;
    },
    getShiftsDataArr(state) {
        return state.shiftsArray;
    },
    getEditDataArr(state) {
        return state.shifts;
    }
  },
});