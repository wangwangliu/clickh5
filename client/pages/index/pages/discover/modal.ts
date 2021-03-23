import { discover } from './server';
import get from 'lodash/get'

export default {
	namespace: 'discover',
	state: {
		banners: [],
		toplist: {},
		hotstories: [],
		spicyreads: [],
		newtrending: [],
		libraryrec: [],
		picksforyou:[]
	},
	reducers: {
		update(state, { payload }) {
			return { ...state, ...payload }
		}
	},
	effects: {
		*fetch({ payload }, { put, select, call }) {
			const { data, code } = yield call(discover, payload);
			if (code == 200) {
				const banners = JSON.parse(get(data,'banners')||"[]");
				const toplist = JSON.parse(get(data,'toplist')||"{}");
				const hotstories = JSON.parse(get(data,'hotstories')||"[]");
				const spicyreads = JSON.parse(get(data,'spicyreads')||"[]");
				const newtrending = JSON.parse(get(data,'newtrending')||"[]");
				const libraryrec = JSON.parse(get(data,'libraryrec')||"[]");
				const picksforyou = JSON.parse(get(data,'picksforyou')||"[]");
				yield put({
					type: 'update',
					payload: {
						banners,
						toplist,
						hotstories,
						spicyreads,
						newtrending,
						libraryrec,
						picksforyou
					}
				})
			}
			return { data, code };
		},
	}
}