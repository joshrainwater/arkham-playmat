<template>  
  <div class="bg-gray-800 text-gray-50 h-screen w-100 overflow-hidden" v-if="this.cards">
    <button @click="menuOpen = true">Open Menu</button>
    <StartMenu class="z-20" v-if="menuOpen" :cards="cards" @newGame="makeNewGame" @close="menuOpen = false"></StartMenu>
    <div v-if="gameState" class="z-auto bg-gray-800 text-white flex flex-col flex-between">
      <div id="tracker" class="flex-grow flex flex-row">
        <DoomTrack v-model:scenario="gameState.scenario"></DoomTrack>
        <ChaosBag v-model:chaosBag="gameState.chaosBag" v-model:tokensDrawn="gameState.tokensDrawn"></ChaosBag>
      </div>
      <div id="investigators" class="flex-grow flex flex-row">
        <template v-for="(investigator, index) in gameState.investigators" :key="index">
          <Investigator class="flex-1" v-model:investigator="gameState.investigators[index]"></Investigator>
        </template>
      </div>
    </div> 
  </div>
</template>

<script>
import axios from 'axios';
import ChaosBag from './components/ChaosBag.vue';
import DoomTrack from './components/DoomTrack.vue';
import Investigator from './components/Investigator.vue';
import StartMenu from './components/StartMenu.vue';

export default {
  name: 'App',
  components: {
    ChaosBag, DoomTrack, Investigator, StartMenu
  },
  data() {
    return {
      menuOpen: true,
      cards: null,
      gameState: null,
    }
  },
  mounted() {
    this.loadCards();
    this.loadPreviousGameState();
    if(!this.gameState) {
      this.menuOpen = true;
    }
  },
  watch: {
    gameState(newState, oldState) {
      console.log('gameState updated')
    }
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
    loadPreviousGameState() {
      // this.gameState = JSON.parse(localStorage.getItem('gameState'));
    },
    makeNewGame(settings) {

      this.gameState = {
        investigators: settings.investigators.map((investigator) => {
          let i = investigator;
          i.currentState = {
            clues: 0,
            resources: 5,
            health: 0,
            sanity: 0,
            done: false,
            dead: false,
            willpower: 0,
            intellect: 0,
            combat: 0,
            agility: 0
          };
          return i;
        }),
        scenario: {
          agenda: 1,
          doom: 0
        },
        chaosBag: settings.chaosBag,
        tokensDrawn: []
      };
      this.menuOpen = false;
    }
  }
}
</script>