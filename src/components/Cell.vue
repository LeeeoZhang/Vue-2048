<template>
  <td>
    <transition name="scale"> 
      <div v-show="matrix[row][col] !== 0">{{matrix[row][col]}}</div>
    </transition>
  </td>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    props: ['row','col'],
    computed: mapState({
      matrix: 'matrix',
    }),
  }
</script>

<style lang="scss" scoped>
  .scale-enter-active, .scale-leave-active {
  transition: transform .5s;
}
  .scale-enter, .scale-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: scale(0)
} 

</style>
