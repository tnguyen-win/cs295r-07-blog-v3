import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import UserContext from '../context/user';
import { useNavigate } from 'react-router-dom';
import { Trash } from 'react-bootstrap-icons';

export default function EditUserProfile() {
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors }
    } = useForm();
    const { editUserById } = useContext(UserContext);
    const { user } = useContext(UserContext);
    const defaultBase64 = 'data:image/png;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs';
    const [avatarSource, setAvatarSource] = useState(user ? `data:image/png;base64,${user.image}` : defaultBase64);
    const navigate = useNavigate();
    const onSubmit = data => {
        const updatedUser = {
            name: data.name,
            userid: data.userid,
            email: data.email,
            bio: data.bio,
            password: data.newPasswordInitial,
            image: avatarSource.split('data:image/png;base64,')[1],
            id: user.id
        };
        editUserById(user.id, updatedUser);
        reset();
        navigate('/', { replace: true });
    };
    const previewFile = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => setAvatarSource(reader.result);

        if (file) reader.readAsDataURL(file);
    };
    const handleDeleteClick = () => {
        setAvatarSource(defaultBase64);
        reset({ avatar: null });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ height: '125vh' }}>
            {/* Heading */}
            <h3 className='display-3 fw-bold text-center mt-5'>Your Profile</h3>
            {/* Avatar */}
            <div className='my-4'>
                <div className='d-flex'>
                    <img src={avatarSource} style={{ height: '128px' }} />
                    <div>
                        {avatarSource !== defaultBase64 ? <button className='btn btn-link ms-3' onClick={handleDeleteClick}><h4><Trash color='red' /></h4></button> : ''}
                    </div>
                </div>
                <br />
                <p className='fw-bold my-3'>Avatar</p>
                <div className='input-group'>
                    <input className='form-control border-secondary-subtle' type='file' accept='image/png, image/gif, image/jpeg, image/jpg' onInputCapture={previewFile} name='avatar' {...register('avatar')} />
                </div>
            </div>
            {/* ID */}
            <div className='my-4'>
                <div className='input-group'>
                    <span className='input-group-text border-secondary-subtle'>ID</span>
                    <input readOnly className='form-control border-secondary-subtle' type='number' defaultValue={user ? user.id : ''} name='id' {...register('id', { required: 'Field is required' })} />
                </div>
                {errors.id && <div className='text-danger mt-2'>{errors.id.message}</div>}
            </div>
            {/* Name */}
            <div className='my-4'>
                <div className='input-group'>
                    <span className='input-group-text border-secondary-subtle'>Name</span>
                    <input className='form-control border-secondary-subtle' type='text' defaultValue={user ? user.name : ''} name='name' {...register('name', { required: 'Field is required' })} />
                </div>
                {errors.name && <div className='text-danger mt-2'>{errors.name.message}</div>}
            </div>
            {/* User ID */}
            <div className='my-4'>
                <div className='input-group'>
                    <span className='input-group-text border-secondary-subtle'>User ID</span>
                    <input className='form-control border-secondary-subtle' type='text' defaultValue={user ? user.userid : ''} name='userid' {...register('userid', { required: 'Field is required' })} />
                </div>
                {errors.userid && <div className='text-danger mt-2'>{errors.userid.message}</div>}
            </div>
            {/* Email */}
            <div className='my-4'>
                <div className='input-group'>
                    <span className='input-group-text border-secondary-subtle'>Category</span>
                    <input className='form-control border-secondary-subtle' type='email' defaultValue={user ? user.email : ''} name='email' {...register('email', { required: 'Field is required' })} />
                </div>
                {errors.email && <div className='text-danger mt-2'>{errors.email.message}</div>}
            </div>
            {/* Bio */}
            <div className='my-4'>
                <div className='input-group'>
                    <span className='input-group-text border-secondary-subtle'>Bio</span>
                    <textarea className='form-control border-secondary-subtle' defaultValue={user ? user.bio : ''} name='bio' {...register('bio', { required: 'Field is required' })}></textarea>
                </div>
                {errors.bio && <div className='text-danger mt-2'>{errors.bio.message}</div>}
            </div>
            {/* Old Password */}
            <div className='my-4'>
                <div className='input-group'>
                    <span className='input-group-text border-secondary-subtle'>Old Password</span>
                    <input readOnly className='form-control border-secondary-subtle' type='password' defaultValue={user ? user.password : ''} name='oldPassword' {...register('oldPassword', { required: 'Field is required' })} />
                </div>
                {errors.oldPassword && <div className='text-danger mt-2'>{errors.oldPassword.message}</div>}
            </div>
            {/* New Password */}
            <div className='my-4'>
                <div className='input-group'>
                    <span className='input-group-text border-secondary-subtle'>New Password</span>
                    <input className='form-control border-secondary-subtle' type='password' defaultValue={''} name='newPasswordInitial' {...register('newPasswordInitial', { required: 'Field is required' })} />
                </div>
                {errors.newPasswordInitial && <div className='text-danger mt-2'>{errors.newPasswordInitial.message}</div>}
            </div>
            {/* Retype New Password */}
            <div className='my-4'>
                <div className='input-group'>
                    <span className='input-group-text border-secondary-subtle'>Retype New Password</span>
                    <input className='form-control border-secondary-subtle' type='password' defaultValue={''} name='newPasswordRedo' {...register('newPasswordRedo', { validate: value => value === getValues('newPasswordInitial') ? true : 'This password does not match the new password' }, { required: 'Field is required' })} />
                </div>
                {errors.newPasswordRedo && <div className='text-danger mt-2'>{errors.newPasswordRedo.message}</div>}
            </div>
            {/* Save */}
            <button className='w-100 btn btn-lg btn-primary' type='submit'>Save</button>
        </form>
    );
}
