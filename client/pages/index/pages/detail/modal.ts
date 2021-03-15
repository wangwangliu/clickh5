import { chapterInfo, setPayAuto, bookOrder,chapterOrder } from './server';
import get from 'lodash/get'

export default {
	namespace: 'chapterInfo',
	state: {
		detailInfo:{}
	},
	reducers: {
	
		update(state, { payload }) {
			return { ...state, ...payload }
		}
	},
	effects: {
    *fetch({ payload }, { put, select,call }){
			const res =	yield call(chapterInfo, payload);
      if(res.code==200){
        yield put({type:'update',payload:{detailInfo:(get(res,'data')||{})}})
      }
			return res;
		},
		*setPayAutoEff({ payload }, { put, select,call }){
			const res =	yield call(setPayAuto, payload);
			return res
		},
		*bookOrderEff({ payload }, { put, select,call }){
			const res =	yield call(bookOrder, payload);
			return res
		},
		*chapterOrderEff({ payload }, { put, select,call }){
			const res =	yield call(chapterOrder, payload);
			return res
		}
  }
}