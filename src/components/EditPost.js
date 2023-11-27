import { useLocation } from 'react-router-dom';
import InputCard from './InputCard';
import parse from 'html-react-parser';

export default function EditPost({ type }) {
    const location = useLocation();
    const post = location.state;

    switch (type) {
        case 'new':
            return (
                <>
                    <div style={{ height: '125vh' }}>
                        <h3 className='display-3 fw-bold text-center mt-5'>New Post</h3>
                        <InputCard id='1' typeComponent='image' typeInput='file' body='Picture' value='R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs' />
                        {/* I'm not sure if "date" type should be "text" type, but leaving as date for now.
                        I can always change this in v3 of the blog application. */}
                        <InputCard id='2' typeComponent='field' typeInput='date' body='Posted On' value='' />
                        <InputCard id='3' typeComponent='field' typeInput='text' body='Title' value='' />
                        <InputCard id='4' typeComponent='field' typeInput='text' body='Category' value='' />
                        {/* Will be replacing this with WYSIWYG editor in v3. */}
                        <InputCard id='5' typeComponent='textarea' typeInput='' body='Body' value='' />
                        <button className='w-100 btn btn-lg btn-primary'>Save</button>
                    </div>
                </>
            );
        case 'edit':
            if (post) {
                const date = new Date(post.datetime);

                return (
                    <>
                        <div style={{ height: '125vh' }}>
                            <h3 className='display-3 fw-bold text-center mt-5'>Edit Post - {post.id}</h3>
                            <InputCard id='1' typeComponent='image' typeInput='file' body='Picture' value={post.image} />
                            {/* I'm not sure if "date" type should be "text" type, but leaving as date for now.
                        I can always change this in v3 of the blog application.

                            Also, I'm not sure if this field should even be available and should perhaps instead be automatically embedded on post submission */}
                            <InputCard id='2' typeComponent='field' typeInput='date' body='Posted On' value={date.toLocaleDateString('en-us', { year: 'numeric', month: 'short' })} />
                            <InputCard id='3' typeComponent='field' typeInput='text' body='Title' value={post.title} />
                            <InputCard id='4' typeComponent='field' typeInput='text' body='Category' value={post.category} />
                            {/* Will be replacing this with WYSIWYG editor in v3. */}
                            <InputCard id='5' typeComponent='textarea' typeInput='' body='Body' value={parse(post.content)} />
                            <button className='w-100 btn btn-lg btn-primary'>Save</button>
                        </div>
                    </>
                );
            } else return <h4 className='display-4 fw-bold text-center mt-5'>You must be logged in to edit posts</h4>;
    }
}
