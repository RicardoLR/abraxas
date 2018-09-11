import Immutable from 'immutable'
import { compose } from 'redux';

const initialState = Immutable.Map({})
	.set('show', false)
	.set('content',new Immutable.Map({title:'', closeButton:false , body:'', footer:[]}))

/* Types */
export const TOGGLE_MODAL = 'TOGGLE_MODAL'

export const SET_CONTENT = 'SET_CONTENT'

/* Reducer */
export default (state = initialState, action) => {

	switch (action.type) {
		case TOGGLE_MODAL:
			return state.set('show', action.show)
		case SET_CONTENT:
			return state.set('content', new Immutable.Map(action.content))
		default:
			return state
	}
}

/* Action Creators */
export const closeModal = () => {
	return  (dispatch) => {
		dispatch({ type: TOGGLE_MODAL, show: false })
	}
}

export const createModal = (config) => {
	let content = {
		title: config.title||'',
		body: config.body||'',
		closeButton: config.closeButton||false,
		footer: config.footer,
		close: config.onClose,
		className: config.className || '',
		noFooter: config.noFooter || false
	}

	return  (dispatch) => {
		dispatch({ type: SET_CONTENT, content })
		dispatch({ type: TOGGLE_MODAL, show: true })
	}
}
