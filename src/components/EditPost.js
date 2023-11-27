import { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import PostContext from '../context/posts';
import UserContext from '../context/user';
import { Trash } from 'react-bootstrap-icons';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

export default function EditPost({ type }) {
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();
    const location = useLocation();
    const post = location.state;
    const { editPostById, createPost } = useContext(PostContext);
    const { user } = useContext(UserContext);
    const defaultBase64 = 'data:image/png;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs';
    const [imageSource, setimageSource] = useState(post ? `data:image/png;base64,${post.image}` : defaultBase64);
    const navigate = useNavigate();
    const onSubmit = data => {
        if (type === 'edit') {
            const updatedPost = {
                title: data.title,
                userId: post.userId,
                datetime: data.datetime.getTime(),
                category: data.category,
                content: data.content,
                image: imageSource.split('data:image/png;base64,')[1],
                id: post.id
            };
            editPostById(post.id, updatedPost);
        } else {
            const newPost = {
                title: data.title,
                userId: user.id,
                datetime: data.datetime.getTime(),
                category: data.category,
                content: data.content,
                image: imageSource.split('data:image/png;base64,')[1]
            };
            createPost(newPost, user);
        }
        reset();
        navigate('/', { replace: true });
    };
    const previewFile = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => setimageSource(reader.result);

        if (file) reader.readAsDataURL(file);
    };
    const handleDeleteClick = () => {
        setimageSource(defaultBase64);
        reset({ image: null });
    };
    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ script: 'sub' }, { script: 'super' }],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
            ['link', 'image', 'video'],
            ['clean']
        ]
    };
    const timePost = post ? new Date(post.datetime).toLocaleDateString('en-us', { year: 'numeric', month: 'short' }) : '';
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];
    const myDate = timePost.split(' ');
    const index = months.findIndex(m => m === myDate[0]);
    const [date, setDate] = useState(post ? new Date(myDate[1], index) : new Date());
    const [html, setHtml] = useState(post ? post.content : '');

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ height: '125vh' }}>
            {/* Heading */}
            <h3 className='display-3 fw-bold text-center mt-5'>{type === 'edit' ? 'Edit Post' : 'New Post'}</h3>
            {/* Image */}
            <div className='my-4'>
                <div className='d-flex'>
                    <img src={imageSource} style={{ height: '128px' }} />
                    <div>
                        {imageSource !== defaultBase64 ? <button className='btn btn-link ms-3' onClick={handleDeleteClick}><h4><Trash color='red' /></h4></button> : ''}
                    </div>
                </div>
                <br />
                <p className='fw-bold my-3'>Image</p>
                <div className='input-group'>
                    <input className='form-control border-secondary-subtle' type='file' accept='image/png, image/gif, image/jpeg, image/jpg' onInputCapture={previewFile} name='image' {...register('image')} />
                </div>
            </div>
            {/* Datetime */}
            <div className='my-4'>
                <div className='input-group'>
                    <span className='input-group-text border-secondary-subtle'>Creation Date</span>
                    <div id='myDate' className='form-control p-0'>
                        <Controller control={control} name='datetime' rules={{ required: 'Field is required' }} defaultValue={date} render={({ field }) => <DatePicker onChange={data => {
                            setDate(data);
                            field.onChange(data);
                        }} selected={field.value} />} />
                    </div>
                </div>
                {errors.datetime && <div className='text-danger mt-2'>{errors.datetime.message}</div>}
            </div >
            {/* Title */}
            <div className='my-4'>
                <div className='input-group'>
                    <span className='input-group-text border-secondary-subtle'>Title</span>
                    <input className='form-control border-secondary-subtle' type='text' defaultValue={post ? post.title : ''} name='title' {...register('title', { required: 'Field is required' })} />
                </div>
                {errors.title && <div className='text-danger mt-2'>{errors.title.message}</div>}
            </div>
            {/* Category */}
            <div className='my-4'>
                <div className='input-group'>
                    <span className='input-group-text border-secondary-subtle'>Category</span>
                    <input className='form-control border-secondary-subtle' type='text' defaultValue={post ? post.category : ''} name='category' {...register('category', { required: 'Field is required' })} />
                </div>
                {errors.category && <div className='text-danger mt-2'>{errors.category.message}</div>}
            </div>
            {/* Content */}
            <div className='my-4'>
                <div className='input-group'>
                    <span className='input-group-text border-secondary-subtle'>Body</span>
                    <div className='form-control p-0'>
                        {/* I'm aware the dropdown link active + hover color is ugly, but I decided to leave it as is to avoid over complicating things */}
                        <Controller control={control} name='content' rules={{ required: 'Field is required' }} render={({ field }) => <ReactQuill theme='snow' modules={modules} defaultValue={html} onChange={data => {
                            setHtml(data);
                            field.onChange(data);
                        }} selected={field.value} />} />
                    </div>
                </div>
                {errors.content && <div className='text-danger mt-2'>{errors.content.message}</div>}
            </div>
            {/* Save */}
            <button className='w-100 btn btn-lg btn-primary' type='submit'>Save</button>
        </form >
    );
}
