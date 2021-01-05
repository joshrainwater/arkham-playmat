<template>  
  <div class="bg-gray-800 text-gray-50 h-screen w-100 overflow-hidden"
       style="background: url('./images/arkham_stolen.jpg') no-repeat center center" v-if="this.cards">
    <button class="absolute top-0 left-0 rounded-br-lg p-2" style="background-color:rgba(255,255,255,.25)" @click="menuOpen = true">New Game</button>
    <StartMenu class="z-50" v-if="menuOpen" :cards="cards" @newGame="makeNewGame" @close="menuOpen = false"></StartMenu>
    <div v-if="gameState" class="z-auto h-screen w-100 text-white" style="background: linear-gradient(rgba(17, 24, 39, .6),rgb(31, 41, 55))">
      <div id="trackers" class="h-1/3">
        <div class="inline-block w-2/3 p-8">
          <DoomTrack v-model:scenario="gameState.scenario"></DoomTrack>
        </div>
        <div class="inline-block w-1/3 p-8">
          <ChaosBag v-model:chaosBag="gameState.chaosBag" v-model:tokensDrawn="gameState.tokensDrawn"></ChaosBag>
        </div>
      </div>
      <div id="investigators" class="h-2/3 flex flex-row items-center justify-around">
        <template v-for="(investigator, index) in gameState.investigators" :key="index">
          <Investigator v-model:investigator="gameState.investigators[index]"></Investigator>
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