import { userBooks } from './server';
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
			const res = yield call(userBooks, payload);
			if (res.code == 200) {
				let books_info_surplus_len = 3 - (((get(res, 'data.books_info')||[]).length) % 3);

			let	books_info = [...(get(res, 'data.books_info')||[]),...Array(books_info_surplus_len).fill({})]

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