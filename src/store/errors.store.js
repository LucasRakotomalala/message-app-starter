export const errorsModule = {
	state: {
		errors: [],
	},
	mutations: {
		pushError(state, payload) {
			state.errors.push(payload.error);
		}
	},
	getters: {
		getErrors(state) {
			return state.errors;
		}
	}
};
