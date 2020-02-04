import test from 'tape'
import {
  incrementAsync,
  fetchData,
  getRandomUser
} from './saga'
import { delay } from 'redux-saga'
import { put, takeEvery, all, call, cps } from 'redux-saga/effects'
const defaultParams = require('./testSagaParams')
// console.log('⭐️ : defaultParams', defaultParams);
// { default: { fetchData: { gender: 'female' } } }
// console.log('⭐️ : default', defaultParams.default.fetchData );
// { gender: 'female' }

test('incrementAsync Saga test', (assert) => {
  // const gen = incrementAsync()

  // console.log('⭐️ : gen.next()\n', gen.next());
  // {
  //   value: {
  //     '@@redux-saga/IO': true,
  //     CALL: { context: null, fn: [Function: delay], args: [Array] }
  //   },
  //   done: false
  // }

  // console.log('⭐️ : gen.next()\n', gen.next());
  // {
  //   value: { '@@redux-saga/IO': true, PUT: { channel: null, action: [Object] } },
  //   done: false
  // }

  // console.log('⭐️ : gen.next()\n', gen.next());
  // { value: undefined, done: true }

  // assert.deepEqual(
  //   gen.next().value,
  //   call(delay, 1000),
  //   'incrementAsync Saga must call delay(1000)'
  // )

  // assert.deepEqual(
  //   gen.next().value,
  //   put({ type: 'INCREMENT' }),
  //   'incrementAsync Saga must dispatch an INCREMENT action'
  // )

  // assert.deepEqual(
  //   gen.next(),
  //   { done: true, value: undefined },
  //   'incrementAsync Saga must be done'
  // )

  const ftd = fetchData()
  // console.log('⭐️ : ftd', ftd);
  //  GeneratorFunctionPrototype [Generator] { _invoke: [Function: invoke] }
  // console.log('⭐️ : ftd', ftd.next());
  // {
  //   value:
  //   {
  //     '@@redux-saga/IO': true,
  //     CALL:
  //       { context: null, fn: [Function: getRandomUser], args: [Array] }
  //   },
  //   done: false
  // }
  // console.log('⭐️ : ftd', ftd.next());
  // {
  //   value:
  //   {
  //     '@@redux-saga/IO': true,
  //       PUT: { channel: null, action: [Object] }
  //   },
  //   done: false
  // }
  // console.log('⭐️ : ftd', ftd.next());
  // { value: undefined, done: true }

  // assert.deepEqual(
  //   ftd.next().value,
  //   call(getRandomUser, defaultParams.default.fetchData),
  //   'fetchData error'
  // )

  assert.deepEqual(
    ftd.next().value,
    cps(getRandomUser, defaultParams.default.fetchData),
    'fetchData error'
  )
  ftd.next()

  assert.end()
})


