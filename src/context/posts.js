import { createContext, useState, useCallback } from 'react';
import axios from 'axios';

const PostsContext = createContext();

function Provider({ children }) {
    const URL = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_JSON : process.env.REACT_APP_PROD_JSON;
    const [featuredPosts, setFeaturedPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
    const fetchFeaturedPosts = useCallback(async () => {
        const response = await axios.get(`${URL}/posts?_expand=user&_sort=datetime&_order=desc&_start=0&_end=12`);

        setFeaturedPosts(response.data);
    }, []);
    const fetchCategories = useCallback(async () => {
        const response = await axios.get(`${URL}/categories?_sort=name&_order=asc`);

        setCategories(response.data);
    }, []);
    const fetchPosts = useCallback(async userId => {
        const response = await axios.get(`${URL}/posts?userId=${userId}&_expand=user&_sort=datetime&_order=desc`);

        setPosts(response.data);
    }, []);
    const editPostById = async (id, newValues) => {
        const response = await axios.put(`${URL}/posts/${id}`, newValues);
        const updatedPosts = posts.map(post => {
            if (post.id === id) return { ...post, ...response.data };

            return post;
        });

        setPosts(updatedPosts);
    };
    const deletePostById = async id => {
        await axios.delete(`${URL}/posts/${id}`);

        const updatedPosts = posts.filter(post => post.id !== id);

        setPosts(updatedPosts);
    };
    const createPost = async (values, user) => {
        const response = await axios.post(`${URL}/posts`, values);
        const newPost = { ...response.data, user };
        const updatedPosts = [...posts, newPost];

        setPosts(updatedPosts);
    };
    const valueToShare = {
        featuredPosts,
        categories,
        posts,
        fetchFeaturedPosts,
        fetchCategories,
        fetchPosts,
        editPostById,
        deletePostById,
        createPost
    };

    return <PostsContext.Provider value={valueToShare}>{children}</PostsContext.Provider>;
}

export { Provider };
export default PostsContext;
