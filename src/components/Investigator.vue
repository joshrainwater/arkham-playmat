<template>
  <div class="flex flex-col m-8 bg-gray-500" style="width:413px;">
    <span @click="flipped = !flipped">Flip</span>
    <div>
      <span v-show="investigator.currentState.willpower" @click="adjustStat('willpower', false)">+{{investigator.currentState.willpower}} W</span>
      <span v-show="investigator.currentState.intellect" @click="adjustStat('intellect', false)">+{{investigator.currentState.intellect}} I</span>
      <span v-show="investigator.currentState.combat" @click="adjustStat('combat', false)">+{{investigator.currentState.combat}} C</span>
      <span v-show="investigator.currentState.agility" @click="adjustStat('agility', false)">+{{investigator.currentState.agility}} A</span>
    </div>
    <div class="flex-grow">
      <div class="card">
        <div class="card-inner" :class="classes">
          <img class="card-front" :src="`https://arkhamdb.com${investigator.imagesrc}`" :usemap="`#investigator-map-${investigator.code}`"/>
          <map :name="`investigator-map-${investigator.code}`">
            <area @click="takeTurn()" alt="Take Turn" title="Take Turn" coords="0,0,217,299" shape="rect">
            <area @click="adjustStat('willpower')" alt="Willpower" title="Willpower" coords="274,48,224,7" shape="rect">
            <area @click="adjustStat('intellect')" alt="Intellect" title="Intellect" coords="275,10,320,46" shape="rect">
            <area @click="adjustStat('combat')" alt="Combat" title="Combat" coords="323,8,368,46" shape="rect">
            <area @click="adjustStat('agility')" alt="Agility" title="Agility" coords="369,6,414,44" shape="rect">
            <area @click="adjustStat('health')" alt="Health" title="Health" coords="286,239,322,278" shape="rect">
            <area @click="adjustStat('sanity')" alt="Sanity" title="Sanity" coords="328,239,370,279" shape="rect">
          </map>
          <img class="card-back" :src="`https://arkhamdb.com${investigator.backimagesrc}`"/>
        </div>
      </div>
    </div>
    <div class="flex-initial flex flex-row mx-8 bg-green-900">
      <div class="flex-1">
        <span class="block text-center" @click="adjustStat('clues', true)">Up</span>
        <span class="block text-center">CLUES {{investigator.currentState.clues}}</span>
        <span class="block text-center" @click="adjustStat('clues', false)">Down</span>
      </div>
      <div class="flex-1">
        <span class="block text-center" @click="adjustStat('resources', true)">Up</span>
        <span class="block text-center">RESOURCES {{investigator.currentState.resources}}</span>
        <span class="block text-center" @click="adjustStat('resources', false)">Down</span>
      </div>
      <div class="flex-1">
        <span class="block text-center" @click="adjustStat('health', true)">Up</span>
        <span class="block text-center">HEALTH {{investigator.currentState.health}}</span>
        <span class="block text-center" @click="adjustStat('health', false)">Down</span>
      </div>
      <div class="flex-1">
        <span class="block text-center" @click="adjustStat('sanity', true)">Up</span>
        <span class="block text-center">SANITY {{investigator.currentState.sanity}}</span>
        <span class="block text-center" @click="adjustStat('sanity', false)">Down</span>
      </div>
    </div>
    <!-- <pre><code>{{investigator}}</code></pre> -->
  </div>
</template>
<script>
export default {
  name: 'Investigator',
  props: ['investigator'],
  emits: ['update:investigator'],
  data() {
    return {
      flipped: false,
    }
  },
  computed: {
    classes() {
      return {
        'flipped': this.flipped, 
        'done': this.investigator.currentState.done,
        'dead': this.investigator.currentState.dead
      }
    }
  },
  methods: {
    adjustStat(stat, up = true) {
      if(!up && this.investigator.currentState[stat] == 0) {
        return;
      }

      if(up) this.investigator.currentState[stat]++;
      else   this.investigator.currentState[stat]--;
      
      if(stat == 'health' && this.investigator.currentState[stat] == this.investigator.health) {
        this.investigator.currentState.dead = true;
      }
      if(stat == 'sanity' && this.investigator.currentState[stat] == this.investigator.sanity) {
        this.investigator.currentState.dead = true;
      }

      this.$emit('update:investigator', this.investigator);

    },
    takeTurn() {
      this.investigator.currentState.done = !this.investigator.currentState.done;
    }
  }
}
</script>
