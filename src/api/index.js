import axios from 'axios';


const url = 'https://instagram-memories.herokuapp.com/';

const API = axios.create({
    baseURL: url
})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts',newPost);
export const updatePost = (id,updatedpost) => API.patch(`/posts/${id}`,updatedpost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const unlikePost = (id) => API.patch(`/posts/${id}/unlikePost`);
export const fetchPost = (id) => API.get(`/posts/${id}`);


export const signIn = (formData) => API.post('/user/signin',formData);
export const signUp = (formData) => API.post('/user/signup',formData);