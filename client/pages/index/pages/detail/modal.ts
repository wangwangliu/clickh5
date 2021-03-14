import { chapterInfo } from './server';
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
        yield put({type:'update',payload:{chapterInfo:(get(res,'data.novel_info')||{})}})
      }
			return res;
		},
  }
}