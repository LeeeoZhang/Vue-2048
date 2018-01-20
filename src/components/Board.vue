<template>
  <table class="board" @keydown.up="onKeyUp" @keydown.down="onKeyDown" @keydown.left="onKeyLeft" @keydown.right="onKeyRight">
    <tr class="row1">
      <td class="cell1">
        <div v-show="matrix[0][0] !== 0">{{matrix[0][0]}}</div>
      </td>
      <td class="cell2">
        <div v-show="matrix[0][1] !== 0">{{matrix[0][1]}}</div>
      </td>
      <td class="cell3">
        <div v-show="matrix[0][2] !== 0">{{matrix[0][2]}}</div>
      </td>
    </tr>
    <tr class="row2">
      <td class="cell4">
        <div v-show="matrix[1][0] !== 0">{{matrix[1][0]}}</div>
      </td>
      <td class="cell5">
        <div v-show="matrix[1][1] !== 0">{{matrix[1][1]}}</div>
      </td>
      <td class="cell6">
        <div v-show="matrix[1][2] !== 0">{{matrix[1][2]}}</div>
      </td>
    </tr>
    <tr class="row3">
      <td class="cell7">
        <div v-show="matrix[2][0] !== 0">{{matrix[2][0]}}</div>
      </td>
      <td class="cell8">
        <div v-show="matrix[2][1] !== 0">{{matrix[2][1]}}</div>
      </td>
      <td class="cell9">
        <div v-show="matrix[2][2] !== 0">{{matrix[2][2]}}</div>
      </td>
    </tr>
  </table>
</template>

<script>
  import Row from './Row.vue'
  import {mapState} from 'vuex'

  export default {
    name: 'HelloWorld',
    components: {
      Row,
    },
    data () {
      return {
        lock: false,
      }
    },
    methods :{
      onKeyUp () {
        if(this.lock) return
        this.lock = true
        console.log('上')
        this.combineNumToTop()
      },
      onKeyDown () {
        console.log('下')
      },
      onKeyLeft () {
        console.log('左')
      },
      onKeyRight () {
        console.log('右')
      },
      combineNumToTop () {
        let newMatrix = JSON.parse(JSON.stringify(this.matrix))
        let len = newMatrix.length
        for(let row = 0; row < len; row++) {
          for (let col = 0; col < len; col++) {
            if(newMatrix[row][col] !== 0 && newMatrix[row][col] === (newMatrix[row + 1] ? newMatrix[row + 1][col]:newMatrix[len - 1][col])) {
              newMatrix[row][col] *= 2
              newMatrix[row + 1] ? newMatrix[row + 1][col] = 0 : newMatrix[len - 1][col] = 0
            } else if (newMatrix[row][col] === 0 && (newMatrix[row + 1] ? newMatrix[row + 1][col]:newMatrix[len - 1][col]) !== 0) {
              newMatrix[row][col] = newMatrix[row + 1][col]
              newMatrix[row + 1] ? newMatrix[row + 1][col] = 0 : newMatrix[len - 1][col] = 0
            }
          }
        }
        this.$store.commit('changeMatrix',{newMatrix})
        this.lock = false
      },
    },
    created(){
      document.body.addEventListener('keydown',(event)=>{
        switch(event.keyCode){
          case 37: this.onKeyLeft(); break
          case 38: this.onKeyUp(); break
          case 39: this.onKeyRight(); break
          case 40: this.onKeyDown(); break
        }
      })
    },
    computed: mapState({
      matrix: 'matrix',
    }),
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .board {
    width: 503px;
    height: 503px;
    box-sizing: border-box;
    margin: 50px auto;
    border-collapse: separate;
    text-align: center;
    font-weight: bold;
    font-size: 50px;
    td {
      padding: 0;
      height: 33.33%;
      width: 33.33%;
      border: 1px solid black;
      background: orange;
      border-radius: 5px;
    }
  }
</style>
