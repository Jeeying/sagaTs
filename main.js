import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import Counter from './Counter'
import reducer from './reducers'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

const action = type => store.dispatch({type})

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState().count}
      text={store.getState().showText}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')}
      testFork={() => action('DO_FORK')}
      testLoopErr={() => action('START_BACKGROUND_TASK')}
      testLoopErrCancel={() => action('CANCEL_TASK')}
      getRandomUser = {() => action('FETCH_REQUESTED')} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
