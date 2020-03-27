import { NEW_USER } from './actionTypes'

export const NewUser = (id,userName,password) => ({
    type: NEW_USER,
    id,
    userName,
    password
})

