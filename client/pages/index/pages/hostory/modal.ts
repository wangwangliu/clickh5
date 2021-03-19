import { bookInfo } from './server';
import get from 'lodash/get'

export default {
	namespace: 'discover',
	state: {
		info:{}
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
        yield put({type:'update',payload:{bookInfo:(get(res,'data.novel_info')||{})}})
      }
			return res;
		},
  }
}