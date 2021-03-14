import { chapterInfo, setPayAuto, bookOrder,chapterOrder } from './server';
import get from 'lodash/get'

export default {
	namespace: 'chapterInfo',
	state: {
		detailInfo:{"need_buy":true,"title":"Chapter 3  Laying in Wait","price":200,
		"content_text":"As it got later, some of the girls started to go to sleep, exhausted from the day\u2019s ordeal.  Lavinia noticed that Helen and the other two women sat uneasily on the edges of their beds.  She caught Helen\u2019s eye about to ask something, but Helen shook her head.  So Lavinia stayed put, letting Rosie",
		"pre_chapter_id":{"id":"2","external_id":"12345677","chapter_id":"000002","chapter_name":"Chapter 2  Fresh Meat","word_count":"10000","price":"200"},
		"next_chapter_id":{"id":"3","external_id":"12345678","chapter_id":"000003","chapter_name":"Chapter 3  Laying in Wait","word_count":"10000","price":"200"}}
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
        yield put({type:'update',payload:{chapterInfo:(get(res,'data')||{})}})
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