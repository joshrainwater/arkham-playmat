<template>
  <div class="fixed text-black bg-white top-0 right-0 bottom-0 left-0 m-10">
    <button @click="$emit('close')">X</button>
    <div class="flex flex-row">
      <div id="options" class="flex-1 h-full">
        <h2>Choose Investigators</h2>
        <select v-model="packFilter">
          <option value="">All</option>
          <option v-for="(name,code) in packs" :value="code" :key="code">{{name}}</option>
        </select>
        <select v-model="factionFilter">
          <option value="">All</option>
          <option v-for="(name,code) in factions" :value="code" :key="code">{{name}}</option>
        </select>
        <div class="h-2/4 overflow-scroll">
          <template v-for="(investigator, index) in filteredInvestigators" :key="index">
            <InvestigatorPill @click="pickInvestigator(investigator.code)" :investigator="investigator"></InvestigatorPill>
          </template>
        </div>

        <h2>Add Tokens to Bag</h2>
        <div class="flex flex-wrap flex-row">
          <template v-for="token in tokens" :key="token">
            <Token class="w-16 h-16 p-2" chaos :token="token" @click="addToken(token)"></Token>
          </template>
        </div>
      </div>
      <div id="picked" class="flex-1">
        <template v-for="(investigator, index) in pickedInvestigators" :key="index">
          <div @click="dropInvestigator(index)">
            <span class="investigator-thumbnail" :style="{'background-image': `url('https://arkhamdb.com${investigator.imagesrc}')`}"></span>
            <span class="title">{{investigator.name}}</span>
          </div>
        </template>
        <h2>Chaos Bag</h2>
        <div class="flex flex-wrap flex-row">
          <template v-for="(token, index) in pickedChaosBag" :key="index">
            <Token class="w-16 h-16 p-2" chaos :token="token" @click="removeToken(index)" rotate></Token>
          </template>
        </div>
      </div>
    </div>
    <button @click="startGame()">Start Game</button>
  </div>
</template>
<script>
import Token from './Token.vue';
import InvestigatorPill from './InvestigatorPill.vue';

export default {
  name: 'StartMenu',
  components: {
    Token,InvestigatorPill
  },
  props: ['cards'],
  computed: {
    investigators() {
      return this.cards.filter(c => c.type_code == 'investigator');
    },
    packs() {
      let packs = {};
      this.investigators.forEach(i => {
        if(!Object.keys(packs).includes(i.pack_code)) {
          packs[i.pack_code] = i.pack_name;
        }
      });
      return packs;
    },
    factions() {
      let factions = {};
      this.investigators.forEach(i => {
        if(!Object.keys(factions).includes(i.faction_code)) {
          factions[i.faction_code] = i.faction_name;
        }
      });
      return factions;
    },
    filteredInvestigators() {
      return this.investigators
        .filter(i => this.packFilter=='' || i.pack_code == this.packFilter)
        .filter(i => this.factionFilter=='' || i.faction_code == this.factionFilter)
        .filter(i => !this.pickedInvestigators.map(p => p.code).includes(i.code))
    }
  },
  data() {
    return {
      packFilter: 'core',
      factionFilter: '',
      tokens: [
        '+1', '0', '-1', '-2', '-3', '-4', '-5', '-6', '-7', '-8', 'skull', 'cultist', 'tombstone', 'tentacles', 'elder-thing', 'elder-sign'
      ],
      pickedInvestigators: [],
      pickedChaosBag: ['+1', '0', '0', '-1', '-1', '-1', '-2', '-2', '-3', '-4', 'skull', 'skull', 'cultist', 'tombstone', 'tentacles', 'elder-sign'],
      // pickedDifficulty: 'standard',
      // difficultyOptions: {
      //   'easy': ['+1', '0', '0', '-1', '-1', '-1', '-2', '-2', '-3', '-4', 'skull', 'skull', 'cultist', 'tombstone', 'chaos', 'eldersign'],
      //   'standard': ['+1', '0', '0', '-1', '-1', '-1', '-2', '-2', '-3', '-4', 'skull', 'skull', 'cultist', 'tombstone', 'chaos', 'eldersign'],
      //   'hard': ['+1', '0', '0', '-1', '-1', '-1', '-2', '-2', '-3', '-4', 'skull', 'skull', 'cultist', 'tombstone', 'chaos', 'eldersign'],
      //   'expert': ['+1', '0', '0', '-1', '-1', '-1', '-2', '-2', '-3', '-4', 'skull', 'skull', 'cultist', 'tombstone', 'chaos', 'eldersign'],
      // }
    }
  },
  methods: {
    pickInvestigator(code) {
      if(this.pickedInvestigators.length < 2 && !this.pickedInvestigators.map(e => e.code).includes(code)) {
        this.pickedInvestigators.push(this.cards.filter(c => c.code == code)[0]);
      }
    },
    dropInvestigator(index) {
      this.pickedInvestigators.splice(index, 1);
    },
    addToken(token) {
      this.pickedChaosBag.push(token);
    },
    removeToken(index) {
      this.pickedChaosBag.splice(index,1);
    },
    startGame() {
      if(this.pickedInvestigators.length) {
        this.$emit('newGame', {
          investigators: this.pickedInvestigators,
          chaosBag: this.pickedChaosBag
        });
      }
    }
  }
}
</script>
