import { redemprionCode } from './server';
import get from 'lodash/get'

export default {
	namespace: 'keyCode',
	state: {
		bookInfo:{}
	},
	reducers: {
	
		update(state, { payload }) {
			return { ...state, ...payload }
		}
	},
	effects: {
    * cdkey({ payload }, { put, select,call }){
			const res =	yield call(redemprionCode, payload);
      // if(res.code==200){
      //   yield put({type:'update',payload:{bookInfo:(get(res,'data.novel_info')||{})}})
      // }
			return res;
		},
  }
}