import { useLocation } from 'react-router-dom';
import Header from './Header';
import parse from 'html-react-parser';

export default function Post() {
    const location = useLocation();
    const post = location.state;

    if (post) {
        const date = new Date(post.datetime);

        return (
            <>
                <div className='bg-black p-4'>
                    <div className='d-flex'>
                        <div className='me-auto'>
                            <h1 className='display-4 fw-bold mb-4'>{post.title}</h1>
                            <div className='d-flex align-items-center gap-3 mb-3'>
                                <img src={`data:image/png;base64, ${post.user.image}`} style={{ height: '64px' }} />
                                <div className='flex-column text-muted small'>
                                    <div>Author - {post.user.name}</div>
                                    <div>{date.toLocaleDateString('en-us', { year: 'numeric', month: 'short' })}</div>
                                </div>
                                <div className='d-inline-block bg-warning fw-bold text-dark p-1'>{post.category}</div>
                            </div>
                        </div>
                        <div><Header src={`data:image/png;base64, ${post.image}`} height='256px' /></div>
                    </div>
                    {parse(post.content)}
                </div>
            </>
        );
    } else return <h4 className='display-4 fw-bold text-center mt-5'>You must be logged in to view posts</h4>;
}
