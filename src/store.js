import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      cards: ['somethjin'],
      gameState: {}
    }
  },
  mutations: {
    update (state) {
      console.log(state);
    }
  }
});