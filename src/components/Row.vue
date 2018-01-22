<template>
    <tr>
      <Cell v-for="(item, index) in matrix[row]" :key="`${row}-${index}`" :col="index" :row="matrix.indexOf(matrix[row])"></Cell>
    </tr>
</template>

<script>
  import { mapState } from 'vuex'
  import Cell from './Cell.vue'
  export default {
    props: ['row'],
    components:{
      Cell,
    },
    computed: mapState({
      matrix: 'matrix',
    }),
  }
</script>

<style lang="scss" scoped>


</style>
