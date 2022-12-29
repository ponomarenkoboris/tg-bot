export const initialState = {
    country: '',
    street: '',
    subject: 'physical'
}

export const formActionTypes = {
    SET_STREET: 'SET_STREET',
    SET_COUNTRY: 'SET_COUNTRY',
    SET_SUBJECT: 'SET_SUBJECT'
}

export const formReducer = (state, action) => {
    switch (action.type) {
        case formActionTypes.SET_STREET:
            return {...state, street: action.payload}
        case formActionTypes.SET_COUNTRY:
            return {...state, country: action.payload}
        case formActionTypes.SET_SUBJECT:
            return {...state, subject: action.payload}
        default:
            return state
    }
}