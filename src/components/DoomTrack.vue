<template>
  <div class="flex flex-col">
    <!-- <pre><code>{{scenario}}</code></pre> -->
    <div class="text-center mb-4">
      <span class="title text-xl">Agenda {{scenario.agenda}}</span>
      <span @click="advanceAgenda()" class="p-1 ml-4 cursor-pointer rounded-full text-lg title w-8 h-8 inline-block" style="background-color: rgba(255,255,255,.25)">+</span>
    </div>
    <div class="text-center flex flex-row">
      <span class="block w-10 h-10 title rounded-full cursor-pointer" style="background: rgba(255,255,255,.2); font-size: 1.75rem" @click="removeDoom()">-</span>
      <div class="flex-grow">
        <Token v-if="!scenario.doom" token="doom" class="w-12 h-12 m-auto inline-block" style="filter: grayscale()"></Token>    
        <template v-else v-for="doom in scenario.doom">
          <Token token="doom" class="inline-block w-12 h-12 m-1" shift></Token>
        </template> 
        <span v-if="scenario.doom" class="title inline-block align-top mt-2 ml-2">[{{scenario.doom}}]</span>
      </div>
      <span class="block w-10 h-10 title rounded-full cursor-pointer" style="background: rgba(255,255,255,.2); font-size: 1.75rem" @click="addDoom()">+</span>
    </div>
  </div>
</template>
<script>
import Token from './Token.vue';

export default {
  name: 'DoomTrack',
  components: {
    Token
  },
  props: ['scenario'],
  emits: ['update:scenario'],
  methods: {
    addDoom() {
      this.scenario.doom++;
    },
    removeDoom() {
      if(this.scenario.doom) {
        this.scenario.doom--;
      }
    },
    advanceAgenda() {
      this.scenario.doom = 0;
      this.scenario.agenda++;
    }
  }
}
</script>
