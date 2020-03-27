import { NEW_USER } from '../actions/actionTypes'

const users = (state = [], action) => {
    switch (action.type) {
        case NEW_USER:
            return [...state, {
                id: action.id,
                userName: action.userName,
                password: action.password
            }]
        default:
            return state
    }
}

export default users