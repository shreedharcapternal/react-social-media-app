import * as api from '../api';

// Action creators

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING'})
        const { data } = await api.fetchPosts(page); 
        dispatch({
            type: 'FETCH_ALL',
            payload: data
        })
        dispatch({ type: 'STOP_LOADING'})
    } catch (error) {
        console.log(error.message);
    } 
}

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING'})
        const { data } = await api.fetchPost(id); 
        dispatch({
            type: 'FETCH_POSTBY_ID',
            payload: data
        })
        dispatch({ type: 'STOP_LOADING'})
    } catch (error) {
        console.log(error.message);
    } 
}

export const getPostsbySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING'})
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({
            type: 'FETCH_BY_SEARCH',
            payload: data
        })
        dispatch({ type: 'STOP_LOADING'})
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING'})
        const { data } = await api.createPost(post);
        dispatch({ type: 'CREATE', payload: data })
        dispatch({ type: 'STOP_LOADING'})
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost = (id,post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id,post);
        dispatch({
            type: 'UPDATE',
            payload: data
        })
    } catch (error) {
        console.log(error.message)
    }
}



export const deletePost = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING'})
        await api.deletePost(id);
        dispatch({
            type: 'DELETE',
            payload: id
        })
        dispatch({ type: 'STOP_LOADING'})
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({
            type: 'LIKE_POST',
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}

export const unlikePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.unlikePost(id);
        dispatch({
            type: 'UNLIKE_POST',
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}


 
