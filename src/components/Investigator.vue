<template>
  <div class="flex flex-col m-8 bg-gray-500" style="width:413px;">
    <span @click="flipped = !flipped">Flip</span>
    <div class="flex-grow">
      <div class="card">
        <div class="card-inner" :class="classes" @click="takeTurn()">
          <img class="card-front" :src="`https://arkhamdb.com${investigator.imagesrc}`"/>
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
    <pre><code>{{investigator}}</code></pre>
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
