import { bookInfo } from './server';
import get from 'lodash/get'

export default {
	namespace: 'chapters',
	state: {
		bookInfo:{}
	},
	reducers: {
	
		update(state, { payload }) {
			return { ...state, ...payload }
		}
	},
	effects: {
    *fetch({ payload }, { put, select,call }){
			const res =	yield call(bookInfo, payload);
      if(res.code==200){
        yield put({type:'update',payload:{bookInfo:(get(res,'data')||{})}})
      }
			return res;
		},
  }
}