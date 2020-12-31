<template>
  <div class="flex flex-col m-8 bg-gray-500">
    <!-- <pre><code>{{scenario}}</code></pre> -->
    <span>Agenda {{scenario.agenda}}</span>
    <div>
      <template v-for="doom in scenario.doom">
        <Token token="doom" class="inline-block w-8 h-8 m-1" shift></Token>
      </template> <span class="title">[{{scenario.doom}}]</span>
    </div>
    <button @click="addDoom()">AddDoom</button>
    <button @click="removeDoom()">RemoveDoom</button>
    <button @click="advanceAgenda()">Agenda</button>
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
      this.scenario.doom--;
    },
    advanceAgenda() {
      this.scenario.doom = 0;
      this.scenario.agenda++;
    }
  }
}
</script>
