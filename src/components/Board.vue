<template>
  <table class="board">
    <Row v-for="(item,index) in matrix" :key="index" :row="index"></Row>
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
    mounted  () {
      let newMatrix = JSON.parse(JSON.stringify(this.matrix))
      this.addRandomNum(newMatrix)
    },
    methods :{
      onKeyUp () {
        if(this.lock) return
        this.lock = true
        this.combineNumToTop()
      },
      onKeyDown () {
        if(this.lock) return
        this.lock = true
        this.combineNumToBottom()
      },
      onKeyLeft () {
        if(this.lock) return
        this.lock = true
        this.combineNumToLeft()
      },
      onKeyRight () {
        if(this.lock) return
        this.lock = true
        this.combineNumToRight()
      },
      //向上合并
      combineNumToTop () {
        let newMatrix = JSON.parse(JSON.stringify(this.matrix))
        let len = newMatrix.length
        for(let row = len - 1; row > 0; row--) {
          for (let col = 0; col < len; col++) {
            if(newMatrix[row][col] > 0 && newMatrix[row][col] === newMatrix[row - 1][col] ) {
              newMatrix[row - 1][col] *= 2
              newMatrix[row][col] = 0
              this.$store.commit('addScore',{score: newMatrix[row - 1][col]})
            } else if (newMatrix[row][col] > 0 && newMatrix[row - 1][col] === 0 ) {
              newMatrix[row - 1][col] = newMatrix[row][col]
              newMatrix[row][col] = 0
            }
          }
        }
        this.addRandomNum(newMatrix)
      },
      //向下合并
      combineNumToBottom () {
        let newMatrix = JSON.parse(JSON.stringify(this.matrix))
        let len = newMatrix.length
        for(let row = 0; row < len - 1; row++) {
          for (let col = 0; col < len - 1; col++) {
            if(newMatrix[row][col] > 0 && newMatrix[row][col] === newMatrix[row + 1][col]) {
              console.log(newMatrix[row])
              newMatrix[row + 1][col] *= 2
              newMatrix[row][col] = 0
              this.$store.commit('addScore',{score: newMatrix[row + 1][col]})
            } else if (newMatrix[row][col] > 0 && newMatrix[row + 1][col] === 0)  {
              console.log(newMatrix[row])
              newMatrix[row + 1][col] = newMatrix[row][col]
              newMatrix[row][col] = 0
            }
          }
        }
        this.addRandomNum(newMatrix)
      },
      //向左合并
      combineNumToLeft () {
        let newMatrix = JSON.parse(JSON.stringify(this.matrix))
        let len = newMatrix.length
        for(let row = 0; row < len; row++) {
          for (let col = len; col > 0; col--) {
            if(newMatrix[row][col] > 0 && newMatrix[row][col] === newMatrix[row][col - 1]) {
              newMatrix[row][col - 1] *= 2
              newMatrix[row][col] = 0
              this.$store.commit('addScore',{score: newMatrix[row][col - 1]})
            } else if (newMatrix[row][col] > 0 && newMatrix[row][col - 1] === 0) {
              newMatrix[row][col - 1] = newMatrix[row][col]
              newMatrix[row][col] = 0
            }
          }
        }
        this.addRandomNum(newMatrix)
      },
      //向右合并
      combineNumToRight () {
        let newMatrix = JSON.parse(JSON.stringify(this.matrix))
        let len = newMatrix.length
        for(let row = 0; row < len; row++) {
          for (let col = 0; col < len; col++) {
            if(newMatrix[row][col] > 0 && newMatrix[row][col] === newMatrix[row][col + 1]) {
              newMatrix[row][col + 1] *= 2
              newMatrix[row][col] = 0
              this.$store.commit('addScore',{score: newMatrix[row][col + 1]})
            } else if (newMatrix[row][col] > 0 && newMatrix[row][col + 1] === 0) {
              newMatrix[row][col + 1] = newMatrix[row][col]
              newMatrix[row][col] = 0
            }
          }
        }
        this.addRandomNum(newMatrix)
      },
      //获取一个随机数
      getRandomNum (arr) {
        return Math.floor(Math.random()*arr.length)
      },
      //获取为0格子的坐标
      getEmptyCell (newMatrix) {
        let emptyCells = []
        for(let i = 0; i<newMatrix.length;i++) {
          for(let j = 0; j<newMatrix[i].length;j++) {
            let value = newMatrix[i][j]
            if(value === 0) {
              emptyCells.push([i,j])
            }
          }
        }
        return emptyCells
      },
      //在为0格子添加随机数字
      addRandomNum (newMatrix) {
        let emptyCells = this.getEmptyCell(newMatrix)
        if(emptyCells.length === 0) return
        let randomCell = this.getRandomNum(emptyCells)
        let randomNum = this.getRandomNum([2,4])
        newMatrix[emptyCells[randomCell][0]][emptyCells[randomCell][1]] = [2,4][randomNum]
        this.$store.commit('changeMatrix',{newMatrix})
        this.lock = false
      },
    },
    computed: mapState({
      matrix: 'matrix',
    }),
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .board {
    width: 503px;
    height: 503px;
    box-sizing: border-box;
    margin: 50px auto 10px auto;
    border-collapse: separate;
    border-spacing: 10px;
    text-align: center;
    font-weight: bold;
    font-size: 50px;
    color: #fff;
    background: #b9ada1;
    border-radius: 5px; 
    td {
      padding: 0;
      height: 25%;
      width: 25%;
      background: #cac0b5;
      border-radius: 5px;
    }
  }
</style>
