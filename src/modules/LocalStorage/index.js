import Immutable from 'immutable'


const initialState = Immutable.Map({})
    .set('Get', new Immutable.Map({}))

/* Types */
export const SET_LOCALSTORAGE = 'SET_LOCALSTORAGE'



/* Reducer */
export default (state = initialState, action) => {

	switch (action.type) {

		case SET_LOCALSTORAGE:
			return state.set('Get', new Immutable.Map(action.Obj))
		default:
			return state;
	}
};



/* Action Creators */

/**
 * @return JSON object of Tareas
 */
export const getLocalStorage = () => {
    return (dispatch) => {

		let db = localStorage.getItem('db')
		dispatch({ type: SET_LOCALSTORAGE, Obj: JSON.parse(db) })

		let promise = new Promise(function (resolve) {
			resolve(JSON.parse(db))
		})
		return promise
        
    };
};


/**
 * Metodo para tomar un json u pasarlo a localstorare en String
 * @param {*} jsonDB: JSON
 */
export const setLocalStorage = ( jsonDB ) => {
    return (dispatch) => {
		
		localStorage.setItem( 'db', JSON.stringify(jsonDB) )
		
		let db = localStorage.getItem('db')
		dispatch({ type: SET_LOCALSTORAGE, Obj: JSON.parse(db) })

		let promise = new Promise(function (resolve) {
			resolve(JSON.parse(db));
		})
		return promise
        
    };
};
