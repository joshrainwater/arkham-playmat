<template>
  <div class="relative inline-block text-center flex flex-col items-center">
    <span class="block w-12 h-12 title rounded-full cursor-pointer" style="background: rgba(255,255,255,.2); font-size: 2rem" @click="$emit('up')">+</span>
    <div class="w-24 h-12 relative mt-4">
      <div class="ml-4 w-12 h-12">
        <Token v-if="!count" :token="token" class="w-8 h-8 m-auto" style="filter: grayscale()"></Token>    
        <template v-else v-for="n in count">
          <Token :token="token" rotate huge-shift class="w-8 h-8 absolute"></Token>
        </template>
      </div>
      <span class="title text-xl absolute top-0 left-16">x{{count}}</span>
    </div>
    <span class="block w-12 h-12 title rounded-full cursor-pointer" style="background: rgba(255,255,255,.2); font-size: 2rem" @click="$emit('down')">-</span>
  </div>
</template>
<script>
import Token from './Token.vue';

export default {
  name: 'TokenPile',
  components: {
    Token,
  },
  emits: ['up', 'down'],
  props: {
    token: String,
    count: Number
  }
}
</script>
