import { userBooks, discover } from './server';
import get from 'lodash/get'

export default {
	namespace: 'myBooks',
	state: {
		books_info: []
	},
	reducers: {

		update(state, { payload }) {
			return { ...state, ...payload }
		}
	},
	effects: {
		*fetch({ payload }, { put, select, call }) {

			const res1 = yield call(discover, payload);
			const res = yield call(userBooks, payload);
			const addObject = {type:'add'};

			if (res1.code == 200) {
				let libraryrec = JSON.parse((get(res1,'data.libraryrec'))||'[]');
				
				if(!!libraryrec.length){
					libraryrec = libraryrec.reduce((total,prev)=>{
						 total.push({...prev,isRecommend:true})
						 return total
					},[])
				}

				let realityList = ([...libraryrec,...(get(res, 'data.books_info')||[]),addObject])
				let books_info_surplus_len = 3 - (((realityList.length) % 3)||3);
				let	books_info = [...realityList,...Array(books_info_surplus_len).fill({})]
				
				yield put({ type: 'update', payload: { books_info } })
			}
			return res;
		},
	},
	// subscriptions:{
	// 	setup({ dispatch, history }) {
	// 		history.listen((location) => {
	// 			const { hash } = location;
	// 			console.log(window,'window===');
	// 			return
	// 			if(!!hash.test('home')){
	// 				dispatch({
	// 					type:'fetch'
	// 				})
	// 			}
	// 		})
	// 	}
	// }
}