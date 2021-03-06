/*eslint-disable no-unused-vars */
import React, { Component, PropTypes } from 'react'

const Counter = ({ value, text, onIncrement, onDecrement, onIncrementAsync, getRandomUser, testFork, testLoopErr, testLoopErrCancel }) =>
      <div>
        <button onClick={onIncrementAsync}>
          Increment after 1 second
        </button>
        {' '}
        <button onClick={onIncrement}>
          Increment
        </button>
        {' '}
        <button onClick={onDecrement}>
          Decrement
        </button>
        {' '}
        <button onClick={getRandomUser}>
          Get API
        </button>
        {' '}
        <button onClick={testFork}>
          Fork
        </button>
        {' '}
        <button onClick={testLoopErr}>
          test Loop Error
        </button>
        {' '}
        <button onClick={testLoopErrCancel}>
          cancel test Loop Error
        </button>
        <hr />
        <div>
          Clicked: {value} times
        </div>
        {' '}
        <div>
          文字：{text}
        </div>
      </div>

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired
}

export default Counter
