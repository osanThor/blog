import { combineReducers } from 'redux';
import getAllKeys from '../../node_modules/lodash/_getAllKeys';
import auth, { authSaga } from './auth';
import loading from './loading';

const rootReducer = combineReducers({
  auth,
  loading,
});

export function* rootSaga() {
  yield getAllKeys([authSaga()]);
}

export default rootReducer;
