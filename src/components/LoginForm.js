import { useState, useContext } from 'react';
import UserContext from '../context/user.js';
import PostsContext from '../context/posts';
import { LoginStatus } from '../context/user.js';

export default function LoginForm({ onSubmit }) {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const { fetchUser } = useContext(UserContext);
    const { fetchPosts } = useContext(PostsContext);
    const [error, setError] = useState('');
    const handleSubmit = async event => {
        event.preventDefault();

        const user = await fetchUser(userId, password);

        if (user.status === 0) {
            fetchPosts(user.info.id);
            setUserId('');
            setPassword('');
            onSubmit();
        } else setError(Object.keys(LoginStatus).find(key => LoginStatus[key] === user.status));
    };

    return (
        <>
            <form className='d-flex flex-column gap-2' onSubmit={handleSubmit}>
                <input className='form-control' type="text" onChange={event => setUserId(event.target.value)} value={userId} placeholder="user id" />
                <input className='form-control' type='password' onChange={event => setPassword(event.target.value)} value={password} placeholder='password' />
                <button className='w-100 btn btn-primary'>Login</button>
            </form>
            <div className={`mt-3 ${error !== '' && error !== 'OK' ? 'mb-3' : ''}`}>{error !== '' && error !== 'OK' ? <small className='text-danger'>Failed attempt at login - {error}</small> : ''}</div >
        </>
    );
}
