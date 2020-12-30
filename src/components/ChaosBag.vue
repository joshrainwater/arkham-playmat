<template>
  <div class="flex flex-row  m-8 bg-gray-500">
    <!-- <pre class="flex-1"><code>{{chaosBag}}</code></pre>
    <pre class="flex-1"><code>{{tokensDrawn}}</code></pre> -->
    <div class="flex-1">
      <button @click="draw()">Draw Token</button>
      <button @click="putAway()">Put Away</button>
    </div> 
    <div>
      <div class="tokens"><p v-for="(token, index) in tokensDrawn" :key="index">{{token}}</p></div>
      <div>Bless {{blessCount}} <button @click="adjustBag('bless')">Add</button><button @click="adjustBag('bless', false)">Remove</button></div>
      <div>Curse {{curseCount}} <button @click="adjustBag('curse')">Add</button><button @click="adjustBag('curse', false)">Remove</button></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ChaosBag',
  props: ['chaosBag', 'tokensDrawn'],
  emits: ['update:chaosBag', 'update:tokensDrawn'],
  computed: {
    blessCount() {
      return this.chaosBag.concat(this.tokensDrawn).filter(i => i == 'bless').length;
    },
    curseCount() {
      return this.chaosBag.concat(this.tokensDrawn).filter(i => i == 'curse').length;
    }
  },
  methods: {
    draw() {
      const num = Math.floor(Math.random() * this.chaosBag.length);
      const drawn = this.chaosBag.splice(num, 1);
      this.tokensDrawn.push(drawn[0]);
    },
    putAway() {
      while(this.tokensDrawn.length) {
        let token = this.tokensDrawn.splice(0,1);
        this.chaosBag.push(token[0]);
      }
    },
    adjustBag(tokenType, up = true) {
      if(up) {
        this.chaosBag.push(tokenType);
        return;
      } 

      if(this.chaosBag.includes(tokenType)) {
        const token = this.chaosBag.findIndex(t => t == tokenType);
        this.chaosBag.splice(token, 1);
      }
    }
  }
}
</script>
