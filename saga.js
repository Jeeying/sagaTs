import { cancel } from 'redux-saga/effects'

// import { dalay } from 'redux-saga'
// import { put, takeEvery, all, call } from 'redux-saga/effects'
const { delay } = require('redux-saga')
const {
  put,
  takeEvery,
  all,
  call,
  takeLatest,
  apply,
  cps,
  take,
  select,
  fork,
  race,
} = require('redux-saga/effects')

function convertParams(params) {
  let result = '?'
  if (params) {
    Object.keys(params).forEach((label) => {
      result += label
      result += '='
      result += params[label]
      result += '&'
    })
  }
  return result.slice(0, -1)
}

function getRandomUser(data = null) {
  // console.log('⭐️ : data', data);
  const http = new XMLHttpRequest();
  http.open("GET", `https://randomuser.me/api/${convertParams(data)}`, false);
  http.send(null);
  return JSON.parse(http.response)
}

function getRandomUserCPS(data = null, callback) {
  const http = new XMLHttpRequest();
  http.open("GET", `https://randomuser.me/api/${convertParams(data)}`, true);
  http.send(null);
  http.onload = (() => {
    callback(null, http.response)
  })
}

function* helloSaga() {
  console.log('Hello Sagas!')
}

function* incrementAsync() {
  const res = yield call(delay, 1000)
  yield put({ type: 'INCREMENT' })
}

function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

function* fetchData(action) {
  // console.log('⭐️ : action', action);  // { type: "FETCH_REQUESTED" }
  try {
    // const data = yield call(getRandomUser, { gender: 'female' })
    // console.log('⭐️ : data', data);
    // const data2 = yield apply(null, getRandomUser, [{ gender: 'female' }])
    // console.log('⭐️ : data2', data2);
    // 第一個參數可以放this，表示this.getRandomUser

    // apply和call本質都是去調用 CALL，所以測試會正確，
    // 雖然CPS和apply使用方式一樣，但call一般用来完成异步操作，cps比較適合耗时比较长的io操作
    const data = yield cps(getRandomUserCPS, { gender: 'female' })
    yield put({ type: 'FETCH_SUCCEEDED', data })
  } catch (error) {
    console.log('⭐️ : error', error);
    yield put({ type: 'FETCH_FAILED', error })
  }

}

function* watchFetchData() {
  yield takeLatest('FETCH_REQUESTED', fetchData)
}

function* watchAndLogTakeEvery() {
  // yield takeEvery('*', function* logger(action) {
  //   const state = yield select()
  //   console.log('⭐️ : takeEvery action', action);
  //   console.log('⭐️ : takeEvery state', state);
  //   console.log(' ', Date.now())
  // })
}

function* watchAndLogTake() {
  // while (true) {
  //   const action = yield take('*')
  //   const state = yield select()
  //   console.log('⭐️ : take action', action);
  //   console.log('⭐️ : take state', state);
  //   console.log(' ', Date.now())
  // }
}

function* stopFork() {
  console.log('stopFork')
}

function* promiseTest(val) {
  console.log('promiseTest')
  yield delay(1000)
  console.log('⭐️ : stopFork', stopFork);
  yield put({ type: 'STOP_FORK', error: 'stop fork' })
  // const stopFork = yield fork(stopFork)
  yield delay(1000)
  const data = yield call(getRandomUser, { gender: 'female' })
}

function* forkTest() {
  try {
    // while (true) {
    yield take('DO_FORK')
    const fork2 = yield fork(promiseTest, true)
    console.log('start li')
    yield take('STOP_FORK')
    console.log('⭐️ : stop');
    if (fork2) {
      yield cancel(fork2)
    }
    // }
  } catch (error) {
    console.log('⭐️ : error', error);
  }
}

function* tesDelay() {
  yield delay(1000)
  console.log('delay')
  return {
    ls: 'remote'
  }
}

function tesPromise() {
  return new Promise(res => {
    setTimeout(() => {
      console.log('promise')
      res('hello')
    }, 2000);
  })
}

function tesPromiseRej() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log('promise')
      rej('error')
    }, 2000);
  })
}

const tesVar = 30

function* allEvent() {
  try {
    // 如果其中一個function有錯誤的話，會跳到 catch
    const allRes = yield all([
      tesDelay(),
      tesPromise(),
      // tesPromiseRej(),
      tesVar,
      getRandomUser()
    ])
    console.log('⭐️ : allRes', allRes);
  } catch (error) {
    console.log('⭐️ : all error', error);
  }
}

function* raceEvent() {
  try {
    // 如果其中一個function有錯誤的話，會跳到 catch
    const raceRes = yield race({
      delay: tesDelay(),
      promise: tesPromise(),
      promiserej: tesPromiseRej(),
      // var: tesVar,
      // randomuser: getRandomUser()
    })
    console.log('⭐️ : raceRes', raceRes);
  } catch (error) {
    console.log('⭐️ : race error', error);
  }
}

function* backgroundTesk() {
  while (true) {
    yield delay(1000)
    console.log('loop')
  }
}

function* watchStartBackgroundTask() {
  while (true) {
    yield take('START_BACKGROUND_TASK')
    yield race({
      task: call(backgroundTesk),
      cancel: take('CANCEL_TASK')
    })
  }
}

function* task1() {
  yield delay(1000)
  console.log('⭐️ : task1');
  return {
    var: 1
  }
}

function* task2() {
  yield delay(2000)
  console.log('⭐️ : task2');
  return {
    var: 2
  }
}

function* nesting() {
  const res = yield all([
    call(task1),
    call(task2),
  ])
  console.log('⭐️ : res', res);
}

function* mutilFork() {
  console.log('⭐️ : task1', task1);
  const task1 = yield fork(task1)
  console.log('⭐️ : task2', task2);
  const task2 = yield fork(task2)
  yield delay(1000)
}

export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync(),
    watchFetchData(),
    // watchAndLogTakeEvery(),
    // watchAndLogTake(),

    // forkTest(),
    // allEvent(),
    // raceEvent(),
    // watchStartBackgroundTask(),
    // nesting(),
    mutilFork()
  ])
}

