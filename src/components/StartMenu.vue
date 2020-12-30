<template>
  <div class="fixed text-black bg-white top-0 right-0 bottom-0 left-0 m-10">
    <button @click="$emit('close')">X</button>
    <div class="flex flex-row">
      <div id="options" class="flex-1">

        <h2>Choose Investigators</h2>
        <template v-for="(investigator, index) in investigators" :key="index">
          <div @click="pickInvestigator(investigator.code)">
            <!-- <span class="investigator-thumbnail" :style="{'background-image': `url('https://arkhamdb.com${investigator.imagesrc}')`}"></span> -->
            {{investigator.name}}
          </div>
        </template>

        <!-- <h2>Choose Difficulty.</h2>
        <template v-for="(chaosBag, difficulty) in difficultyOptions" :key="difficulty">
          <div @click="pickedDifficulty = difficulty">
            {{difficulty}}
            {{chaosBag}}
          </div>
        </template> -->
        <h2>Add Chaos Tokens</h2>
        <template v-for="token in tokens" :key="token">
          <div @click="addToken(token)">{{token}}</div>
        </template>
      </div>
      <div id="picked" class="flex-1">
        <template v-for="(investigator, index) in pickedInvestigators" :key="index">
          <div @click="dropInvestigator(index)">
            <span class="investigator-thumbnail" :style="{'background-image': `url('https://arkhamdb.com${investigator.imagesrc}')`}"></span>
            {{investigator.name}}
          </div>
        </template>
        <template v-for="(token, index) in pickedChaosBag" :key="index">
          <div @click="removeToken(index)">{{token}}</div>
        </template>        <!-- <div>
          {{pickedDifficulty}}
          {{difficultyOptions[pickedDifficulty]}}
        </div> -->
      </div>
    </div>
    <button @click="startGame()">Start Game</button>
    <br>
  </div>
</template>
<script>
export default {
  name: 'StartMenu',
  props: ['cards'],
  computed: {
    investigators() {
      return this.cards.filter(c => c.type_code == 'investigator' && c.pack_code == 'core');
    },
  },
  data() {
    return {
      tokens: [
        '+1', '0', '-1', '-2', '-3', '-4', '-5', '-6', '-7', '-8', 'skull', 'tablet', 'cultist', 'elder-thing', 'elder-sign', 'tenacles'
      ],
      pickedInvestigators: [],
      pickedChaosBag: ['+1', '0', '0', '-1', '-1', '-1', '-2', '-2', '-3', '-4', 'skull', 'skull', 'cultist', 'tombstone', 'chaos', 'eldersign'],
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
      if(this.pickedInvestigators.length < 2) {
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
