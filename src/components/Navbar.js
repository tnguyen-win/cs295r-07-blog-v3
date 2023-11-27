import { useContext, useState } from 'react';
import UserContext from '../context/user';
import { Link } from 'react-router-dom';
import { PlusLg } from 'react-bootstrap-icons';
import LoginForm from './LoginForm';

export default function Navbar() {
    const { user, resetUser } = useContext(UserContext);
    const [showLogin, setShowLogin] = useState(false);
    /*
        I initially attempted to pass a boolean parameter to handleLoginClick() in the hopes that I didn't need to create two separate functions for similar code.
        Unfortunately, it threw the error - "Too many re-renders. React limits the number of renders to prevent an infinite loop."
        Hence why I've created two separate functions.
    */
    const handleBrandClick = () => {
        setShowLogin(false);

        if (user) {
            resetUser();
            setShowLogin(false);
        }
    };
    const handleLoginSubmit = () => setShowLogin(false);
    const handleLoginClick = () => {
        setShowLogin(!showLogin);

        if (user) {
            resetUser();
            setShowLogin(false);
        }
    };

    return (
        <>
            <div className='d-flex flex-column'>
                <div className='d-flex align-items-center'>
                    <Link className='btn me-auto' to='/' onClick={handleBrandClick}><h3 className='fw-bold'>CS295R - Blog</h3></Link>
                    <div className='d-flex align-items-center'>
                        {user ? (
                            <>
                                <Link to='posts/new'>
                                    <PlusLg className='border border-primary me-3' style={{ color: '#0d6efd', fontSize: '32px' }} />
                                </Link>
                                <Link to='user'><img src={`data:image/png;base64, ${user.image}`} style={{ height: '32px' }} /></Link>
                            </>
                        ) : ''}
                        <button className='btn' onClick={handleLoginClick}>{user ? 'Logout' : 'Login'}</button>
                    </div>
                </div>
                <div className='mt-3 ms-auto'>{showLogin ? <LoginForm onSubmit={handleLoginSubmit} /> : ''}</div>
            </div >
        </>
    );
}
