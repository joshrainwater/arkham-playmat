<template>
  <div>
    <img :src="`/images/${(chaos ? 'chaos/': '')}${token}.png`" 
         :alt="token" 
         :style="`transform: rotate(${rotation}deg) translateX(${x}px) translateY(${y}px)`">
  </div>
</template>
<script>
export default {
  name: 'Token',
  props: {
    token: String,
    chaos: Boolean,
    rotate: Boolean,
    shift: Boolean,
    hugeShift: Boolean
  },
  data() {
    return {
      rotation: 0,
      x: 0,
      y: 0
    }
  },
  mounted() {
    if(this.rotate) {
      this.rotation = -10 + Math.floor(Math.random()*20)
    }
    if(this.shift) {
      this.x = -3 + Math.floor(Math.random()*6);
      this.y = -3 + Math.floor(Math.random()*6);
    }
    if(this.hugeShift) {
      this.x = -10 + Math.floor(Math.random()*20);
      this.y = -10 + Math.floor(Math.random()*20);
    }
  }
}
</script>
