export default (state = 0, action) => {
  switch (action.type) {
    case 'SliderChange':
      return state + 1
    default:
      return state
  }
}
