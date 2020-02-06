const defaultState = {
  count: 0,
  showText: ''
}
export default function counter(state = defaultState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1
      }
    case 'INCREMENT_IF_ODD':
      return {
        ...state,
        count: (state.count % 2 !== 0) ? state.count + 1 : state.count
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1
      }
    case 'FETCH_SUCCEEDED':
      return {
        ...state,
        showText: JSON.stringify(action.data)
      }
    case 'FETCH_FAILED':
      return {
        ...state,
        showText: JSON.stringify(action.error)
      }
    case 'STOP_FORK':
      return {
        ...state,
        showText: JSON.stringify(action.error)
      }

    default:
      return state
  }
}
