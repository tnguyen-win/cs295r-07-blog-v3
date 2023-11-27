import './App.css';
import { useContext, useEffect } from 'react';
import UserContext from './context/user';
import PostsContext from './context/posts';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import EditUserProfile from './components/EditUserProfile';
import Post from './components/Post';
import EditPost from './components/EditPost';
import NoPage from './pages/NoPage';

export default function App() {
    const { user } = useContext(UserContext);
    const { fetchFeaturedPosts, fetchCategories } = useContext(PostsContext);
    const location = useLocation();

    useEffect(() => {
        fetchFeaturedPosts();
        fetchCategories();
    }, [fetchFeaturedPosts, fetchCategories]);

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="user" element={user ? <EditUserProfile /> : <Navigate replace to={'/'} />} />
                    <Route path="posts/:id" element={<Post />} />
                    <Route path="posts/new" element={user ? <EditPost type='new' /> : <Navigate replace to={'/'} />} />
                    <Route path="posts/edit/:id" element={user && location && location.state && user.id === location.state.userId ? <EditPost type='edit' /> : <Navigate replace to={'/'} />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </>
    );
}
