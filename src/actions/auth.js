import * as api from '../api';


export const signin = (formData,history) => async (dispatch) => {
    try {
        // log in the user
        const { data } = await api.signIn(formData);

        dispatch({ type: 'AUTH', data })

        history.push('/')
    } catch (error) {
        console.log(error);
    }
}  

export const signup = (formData,history) => async (dispatch) => {
    try {
        // signup the user
        const { data } = await api.signUp(formData);

        dispatch({
            type: 'AUTH',
            data
        })

        history.push('/')
    } catch (error) {
        console.log(error);
    }
}

