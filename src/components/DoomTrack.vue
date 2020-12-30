<template>
  <div class="flex flex-col m-8 bg-gray-500">
    <!-- <pre><code>{{scenario}}</code></pre> -->
    <span>Agenda {{scenario.agenda}}</span>
    <div>
      <span class="inline-block" style="font-size:30px" v-for="doom in scenario.doom">*</span> [{{scenario.doom}}]
    </div>
    <button @click="addDoom()">AddDoom</button>
    <button @click="removeDoom()">RemoveDoom</button>
    <button @click="advanceAgenda()">Agenda</button>
  </div>
</template>
<script>
export default {
  name: 'DoomTrack',
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
