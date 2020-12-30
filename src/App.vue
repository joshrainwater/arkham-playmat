<template>  
  <div class="bg-gray-800 text-gray-50" v-if="gameState">
        <!-- <div>
          <p class="flex-grow">ResetGameState</p>
        </div> -->

    <!-- <StartMenu 
      :cards="cards"
      :scenario="scenario" 
      :investigators="investigators"></StartMenu> -->
    <div class="bg-gray-800 text-white flex flex-col flex-between">
      <div id="tracker" class="flex-grow flex flex-row">
        <DoomTrack v-model:scenario="gameState.scenario"></DoomTrack>
        <ChaosBag v-model:chaosBag="gameState.chaosBag" v-model:tokensDrawn="gameState.tokensDrawn"></ChaosBag>
      </div>
      <div id="investigators" class="flex-grow flex flex-row">
        <template v-for="(investigator, index) in gameState.investigators" :key="index">
          <Investigator class="flex-1" v-model:investigator="gameState.investigators[index]"></Investigator>
        </template>
      </div>
      <div>
      </div>
    </div> 
  </div>
</template>

<script>
import axios from 'axios';
// import StartMenu from './components/StartMenu.vue';
import ChaosBag from './components/ChaosBag.vue';
import DoomTrack from './components/DoomTrack.vue';
import Investigator from './components/Investigator.vue';

export default {
  name: 'App',
  components: {
    ChaosBag, DoomTrack, Investigator
  },
  data() {
    return {
      cards: null,
      gameState: null,
    }
  },
  mounted() {
    this.loadCards();
    this.loadGameState();
  },
  watch: {
    // gameState(newState, oldState) {
      // console.log('gameState updated');

      // let turnsTaken = newState.investigators.filter((i) => {
      //   return i.currentState.done == true;
      // });
      // console.log(turnsTaken.length);

      // localStorage.setItem('gameState', JSON.stringify(newState));
    // }
  },
  methods: {
    loadCards() {
      this.cards = JSON.parse(localStorage.getItem('cards'));
      if(!this.cards) {
        console.log('uh oh');
        axios.get('https://arkhamdb.com/api/public/cards/').then((response) => {
          localStorage.setItem('cards', JSON.stringify(response.data));
          this.cards = response.data;
        });
      }
    },
    loadGameState() {
    
      // this.gameState = JSON.parse(localStorage.getItem('gameState'));

      if(!this.gameState) {
        this.gameState = {
          investigators: this.cards.filter((card) => {
            return ['01001', '01002'].includes(card.code)
          }).map((investigator) => {
            let i = investigator;
            i.currentState = {
              clues: 0,
              resources: 5,
              health: 0,
              sanity: 0,
              done: false,
              dead: false
            };
            return i;
          }),
          scenario: {
            agenda: 1,
            doom: 0
          },
          chaosBag: [
            '+1', '0', '0', '-1', '-1', '-1', '-2', '-2', '-3', '-4', 'skull', 'skull', 'cultist', 'tombstone', 'chaos', 'eldersign'
          ],
          tokensDrawn: []
        };
      }
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
