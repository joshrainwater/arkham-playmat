<template>
  <div class="relative inline-block w-8 h-8">
    <Token v-if="!count" :token="token" class="w-8 h-8" style="filter: grayscale()"></Token>    
    <template v-else v-for="n in count">
      <Token :token="token" rotate huge-shift class="w-8 h-8 absolute"></Token>
    </template>
  </div>
</template>
<script>
import Token from './Token.vue';

export default {
  name: 'TokenPile',
  components: {
    Token,
  },
  props: {
    token: String,
    count: Number
  }
}
</script>
