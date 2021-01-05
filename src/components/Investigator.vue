<template>
  <div class="block relative" style="width:413px;">
    <span class="flipper absolute z-30 top-1 text-xl title cursor-pointer" :class="(flipped) ? 'flipped' : ''" style="left:14px" @click="flipped = !flipped">⟳</span>
    <div class="text-right" style="height: 32px">
      <span class="stat-block text-xl text-center title m-1 inline-block cursor-pointer" :class="(investigator.currentState.willpower) ? '': 'down'" style="width:40px" @click="adjustStat('willpower', false)">{{(investigator.currentState.willpower) ? `+${investigator.currentState.willpower}` : ''}}</span>
      <span class="stat-block text-xl text-center title m-1 inline-block cursor-pointer" :class="(investigator.currentState.intellect) ? '': 'down'" style="width:40px" @click="adjustStat('intellect', false)">{{(investigator.currentState.intellect) ? `+${investigator.currentState.intellect}` : ''}}</span>
      <span class="stat-block text-xl text-center title m-1 inline-block cursor-pointer" :class="(investigator.currentState.combat) ? '': 'down'" style="width:40px" @click="adjustStat('combat', false)">{{(investigator.currentState.combat) ? `+${investigator.currentState.combat}` : ''}}</span>
      <span class="stat-block text-xl text-center title m-1 inline-block cursor-pointer" :class="(investigator.currentState.agility) ? '': 'down'" style="width:40px" @click="adjustStat('agility', false)">{{(investigator.currentState.agility) ? `+${investigator.currentState.agility}` : ''}}</span>
    </div>
    <div class="card block relative mb-2">
      <div class="card-inner" :class="classes">
        <img class="card-front" :src="`https://arkhamdb.com${investigator.imagesrc}`" :usemap="`#investigator-map-${investigator.code}`"/>
        <map :name="`investigator-map-${investigator.code}`">
          <area class="cursor-pointer" @click="takeTurn()" alt="Take Turn" title="Take Turn" coords="0,0,217,299" shape="rect">
          <area class="cursor-pointer" @click="adjustStat('willpower')" alt="Willpower" title="Willpower" coords="274,48,224,7" shape="rect">
          <area class="cursor-pointer" @click="adjustStat('intellect')" alt="Intellect" title="Intellect" coords="275,10,320,46" shape="rect">
          <area class="cursor-pointer" @click="adjustStat('combat')" alt="Combat" title="Combat" coords="323,8,368,46" shape="rect">
          <area class="cursor-pointer" @click="adjustStat('agility')" alt="Agility" title="Agility" coords="369,6,414,44" shape="rect">
          <area class="cursor-pointer" @click="adjustStat('health')" alt="Health" title="Health" coords="286,239,322,278" shape="rect">
          <area class="cursor-pointer" @click="adjustStat('sanity')" alt="Sanity" title="Sanity" coords="328,239,370,279" shape="rect">
        </map>
        <img class="card-back" :src="`https://arkhamdb.com${investigator.backimagesrc}`"/>
      </div>
    </div>
    <div class="flex flex-row mx-4">
      <TokenPile class="flex-grow" token="clue" :count="investigator.currentState.clues" @up="adjustStat('clues', true)" @down="adjustStat('clues', false)"></TokenPile>
      <TokenPile class="flex-grow" token="resource" :count="investigator.currentState.resources" @up="adjustStat('resources', true)" @down="adjustStat('resources', false)"></TokenPile>
      <TokenPile class="flex-grow" token="health" :count="investigator.currentState.health" @up="adjustStat('health', true)" @down="adjustStat('health', false)"></TokenPile>
      <TokenPile class="flex-grow" token="sanity" :count="investigator.currentState.sanity" @up="adjustStat('sanity', true)" @down="adjustStat('sanity', false)"></TokenPile>
    </div>
    <!-- <pre><code>{{investigator}}</code></pre> -->
  </div>
</template>
<style scoped>
  .flipper {
    transition: transform .25s ease;
  }
  .flipper.flipped {
    transform: rotate(180deg);
  }
  .stat-block {
    opacity: 1;
    transition: transform .25s ease;
  }
  .stat-block.down {
    transform: translateY(32px);
  }
</style>
<script>
import Token from './Token.vue';
import TokenPile from './TokenPile.vue';

export default {
  name: 'Investigator',
  components: {
    Token, TokenPile
  },
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
