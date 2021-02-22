export default {
	namespace: 'global',
	state: {
		bottomBar: {
			show: true,
			curr: 'discover'
		}
	},
	reducers: {
		updateBar(state, { payload }) {
			return { state, bottomBar: { ...state.bottomBar, ...payload } }
		}
	},
	effects: {

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