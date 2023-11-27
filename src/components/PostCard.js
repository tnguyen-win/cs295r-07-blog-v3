import { useContext } from 'react';
import PostsContext from '../context/posts';
import UserContext from '../context/user';
import { Link } from 'react-router-dom';
import { BsFillGearFill } from 'react-icons/bs';
import { Trash } from 'react-bootstrap-icons';
import parse from 'html-react-parser';

export default function PostCard({ post }) {
    const { deletePostById } = useContext(PostsContext);
    const { user } = useContext(UserContext);
    const handleDeleteClick = () => deletePostById(post.id);
    const date = new Date(post.datetime);

    return (
        <div className='col p-0 shadow-lg shadow-danger'>
            <div className='card h-100 border-0'>
                <img alt='post' src={`data:image/png;base64, ${post.image}`} />
                <div className='card-body bg-black'>
                    <div className='d-flex justify-content-between mb-3'>
                        <div className='bg-warning fw-bold text-dark p-1'>{post.category}</div>
                        <div className='d-flex justify-content-between'>
                            <div className='mt-2 me-2'>{user && user.id === post.userId ? <Link to={`/posts/edit/${post.id}`} state={post}><BsFillGearFill color='white' /></Link> : ''}</div>
                            <div>{user && user.id === post.userId ? <button className='btn btn-link' onClick={handleDeleteClick}><Trash color='red' /></button> : ''}</div>
                        </div>
                    </div>
                    <h5 className='card-title fw-bold text-center'>{post.title}</h5>
                    <div className='card-text'>
                        {parse(post.content.substring(0, 100))}
                        <Link to={`/posts/${post.id}`} state={post}>more...</Link>
                    </div>
                </div>
                <div className='card-footer bg-light-subtle border-0'>
                    <div className='text-muted small'>{post.user.name} in {date.toLocaleDateString('en-us', { year: 'numeric', month: 'short' })}</div>
                </div>
            </div>
        </div>
    );
}
