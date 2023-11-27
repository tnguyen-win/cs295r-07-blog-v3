import { useContext } from 'react';
import UserContext from '../context/user';
import PostsContext from '../context/posts';
import PostCard from './PostCard';

export default function Posts() {
    const { user } = useContext(UserContext);
    const { posts, featuredPosts } = useContext(PostsContext);
    const postsToRender = user ? posts : featuredPosts;
    const renderedPosts = postsToRender.map((post) => <PostCard key={post.id} post={post} />);

    return <div className='row row-cols-1 row-cols-lg-4 justify-content-center gap-4'>{renderedPosts}</div>;
}
