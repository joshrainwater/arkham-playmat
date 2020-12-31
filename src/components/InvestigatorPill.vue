<template>
  <div>
    <span class="investigator-thumbnail" :style="{'background-image': `url('https://arkhamdb.com${investigator.imagesrc}')`}"></span>
    <span class="title">{{investigator.name}}</span>
  </div>
</template>
<script>
export default {
  name: 'InvestigatorPill',
  props: {
    investigator: Object
  }
}
</script>
