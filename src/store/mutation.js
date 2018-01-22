export default {
  changeMatrix (state,payload) {
    state.matrix = payload.newMatrix
  },
  addScore(state,payload) {
    state.score += payload.score
    console.log(payload)
  },
}
