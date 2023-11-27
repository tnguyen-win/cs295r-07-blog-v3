import { useContext } from 'react';
import UserContext from '../context/user';
import Header from '../components/Header';
import PostList from '../components/PostList';

export default function Home() {
    const { user } = useContext(UserContext);

    return (
        <>
            <div className='d-flex flex-column'>
                <Header src='channels4_banner.jpg' />
                <h3 className='display-3 fw-bold text-center mb-5'>{user ? 'My Posts' : 'Featured Posts'}</h3>
                <PostList />
            </div>
        </>
    );
}
