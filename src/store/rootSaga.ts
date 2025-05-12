import { all, call, put, takeLatest } from "redux-saga/effects";
import { fetchMessage, setMessage } from "@/store/features/users/userSlice";
import { fetchMessageApi } from "@/store/services/api";

// Handler for fetching message
function* handleFetchMessage() {
  try {
    const response: string = yield call(fetchMessageApi);
    yield put(setMessage(response));
  } catch (error) {
    console.error("Fetch message failed", error);
  }
}

// Watcher
function* watchAll() {
  yield takeLatest(fetchMessage.type, handleFetchMessage);
}

export default function* rootSaga() {
  yield all([
    watchAll(), // Add other watchers here
  ]);
}
