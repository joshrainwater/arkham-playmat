<template>
  <div class="flex flex-col">
    <div class="flex flex-row-reverse flex-start">
      <button class="rounded-full p-2 ml-4 cursor-pointer" style="background-color: rgba(255,255,255,.25)" @click="draw()">Draw Token</button>
      <button class="rounded-full p-2 cursor-pointer" style="background-color: rgba(255,255,255,.25)" v-show="tokensDrawn.length" @click="putAway()">Put Away</button>
    </div> 
    <div @click="putAway()" class="flex flex-wrap flex-row-reverse cursor-pointer">
      <template v-for="(token,index) in tokensDrawn" :key="token">
        <Token class="m-1" :class="[ index==0 ? 'w-32 h-32' : 'w-16 h-16' ]" :token="token" chaos rotate shift></Token>
      </template>
    </div>
    <!-- <div>Bless {{blessCount}} <button @click="adjustBag('bless')">Add</button><button @click="adjustBag('bless', false)">Remove</button></div>
    <div>Curse {{curseCount}} <button @click="adjustBag('curse')">Add</button><button @click="adjustBag('curse', false)">Remove</button></div> -->
  </div>
</template>
<script>
import Token from './Token.vue';

export default {
  name: 'ChaosBag',
  props: ['chaosBag', 'tokensDrawn'],
  components: {
    Token
  },
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
      this.tokensDrawn.unshift(drawn[0]);
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
