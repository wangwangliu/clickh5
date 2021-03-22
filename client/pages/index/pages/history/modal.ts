import { ordersInfoLog, purchasesInfoLog } from './server';
import get from 'lodash/get'

export default {
	namespace: 'history',
	state: {
		ordersInfoLog: [],
		purchasesInfoLog:[]
	},
	reducers: {
		update(state, { payload }) {
			return { ...state, ...payload }
		}
	},
	effects: {
		*fetchOrdersInfoLog({ payload }, { put, select, call }) {
			const res = yield call(ordersInfoLog, payload);
			if (res.code == 200) {
				yield put({ type: 'update', payload: { ordersInfoLog: (get(res, 'data.orders_info') || {}) } })
			}
			return res;
		},
		*fetchPurchasesInfoLog({ payload }, { put, select, call }) {
			const res = yield call(purchasesInfoLog, payload);
			if (res.code == 200) {
				yield put({ type: 'update', payload: { purchasesInfoLog: (get(res, 'data.purchases_info') || {}) } })
			}
			return res;
		},
	}
}