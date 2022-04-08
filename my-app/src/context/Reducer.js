const Reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return {
                ...state,
                user: true,
                name:action.payload
            }
        case 'REMOVE_USER':
            localStorage.removeItem('jsonwebtoken')
            return {
                ...state,
                user: false,
                name:null
            }
        case 'ADD_LOADING':
            return {
                ...state,
                loading:true
            }
        case 'REMOVE_LOADING':
            return {
                ...state,
                loading:false
            }
        default:
            return state
    }
}

export default Reducer