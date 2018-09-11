import Tareas from 'Modules/Tareas'
import LocalStorage from 'Modules/LocalStorage'
import Modal from 'Modules/Modal'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
	Tareas,
	LocalStorage,
	Modal,
})

export default rootReducer
