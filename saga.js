// import { dalay } from 'redux-saga'
// import { put, takeEvery, all, call } from 'redux-saga/effects'
const { delay } = require('redux-saga')
const { put, takeEvery, all, call, takeLatest, apply, cps } = require('redux-saga/effects')

function convertParams(params) {
  let result = '?'
  Object.keys(params).forEach((label) => {
    result += label
    result += '='
    result += params[label]
    result += '&'
  })
  return result.slice(0, -1)
}

function getRandomUser(data = null, callback) {
  const http = new XMLHttpRequest();
  http.open("GET", "https://randomuser.me/api/", false);
  const params = JSON.stringify(data);
  http.send(params);
  callback(http.response)
  return JSON.parse(http.response)
}

function getRandomUserCPS(data = null, callback) {
  // console.log('⭐️ : data', data);
  console.log('⭐️ : callback', callback);
  const http = new XMLHttpRequest();
  http.open("GET", `https://randomuser.me/api/${convertParams(data)}`, false);
  // const params = JSON.stringify(data);
  http.send(null);
  callback(http.response)
  // return JSON.parse(http.response)
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
    const data3 = yield cps(getRandomUserCPS, { gender: 'female' })
    // console.log('⭐️ : data', data);
    // console.log('⭐️ : data3', data3);
    // yield put({ type: 'FETCH_SUCCEEDED', data })
  } catch (error) {
    // yield put({ type: 'FETCH_FAILED', error })
  }

}

function* watchFetchData() {
  yield takeLatest('FETCH_REQUESTED', fetchData)
}

export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync(),
    watchFetchData()
  ])
}

