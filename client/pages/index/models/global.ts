import { login, register, userInfo } from './server'

export default {
	namespace: 'global',
	state: {
		bottomBar: {
			show: true,
			curr: 'discover',
		},
		showLoginModal: false,
		userInfo: {},
		isNeedLogin: true
	},
	reducers: {
		updateBar(state, { payload }) {
			return { ...state, bottomBar: { ...state.bottomBar, ...payload } }
		},
		update(state, { payload }) {
			return { ...state, ...payload }
		}
	},
	effects: {
		*loginEff({ payload }, { put, select,call }){
			const res =	yield call(login, payload);
			console.log(res,'res===')
			return res
		},
		*registerEff({ payload }, { put, select,call }){
			const res =	yield call(register, payload);
			return res
		},
		*userInfoEff({ payload }, { put, select,call }){
			const res =	yield call(userInfo, payload);
			return res
		}
	},
	subscriptions: {
		setup({ dispatch, history }) {
			history.listen(({ pathname }) => {
				if (pathname.indexOf('/home') > -1) {
					dispatch({
						type: 'updateBar',
						payload: {
							curr: 'home'
						}
					})
				}
				if (pathname.indexOf('/me') > -1) {
					dispatch({
						type: 'updateBar',
						payload: {
							curr: 'me'
						}
					})
				}
				if (pathname.indexOf('/discover') > -1) {
					dispatch({
						type: 'updateBar',
						payload: {
							curr: 'discover'
						}
					})
				}
			});
		}
	}
};