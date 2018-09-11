//import Axios from 'Axios'
import Immutable from 'immutable'


const initialState = Immutable.Map({})
    .set('Search', new Immutable.List([]))
    .set('Response', new Immutable.Map({}))
    .set('Task', new Immutable.Map({}))

/* Types */
export const ACTION_TASK = 'ACTION_TASK'



/* Reducer */
export default (state = initialState, action) => {

	switch (action.type) {

		case ACTION_TASK:
			return state.set('Task', new Immutable.Map(action.Obj))
		default:
			return state;
	}
};

/* Action Creators */
export const modifyTask = ( form ) => {

    return (dispatch) => {
        dispatch({ type: ACTION_TASK, Obj: form })

        let promise = new Promise(function (resolve) {
			resolve(form)
		})
		return promise
    };
};

