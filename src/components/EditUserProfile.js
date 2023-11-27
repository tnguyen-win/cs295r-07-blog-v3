import { useContext } from 'react';
import UserContext from '../context/user';
import InputCard from './InputCard';

export default function EditUserProfile() {
    const { user } = useContext(UserContext);

    return (
        <>
            <div style={{ height: '125vh' }}>
                <h3 className='display-3 fw-bold text-center mt-5'>Your Profile</h3>
                <InputCard id='1' typeComponent='image' typeInput='file' body='Profile Picture' value={user ? user.image : ''} />
                <InputCard id='2' typeComponent='field' typeInput='number' body='ID' value={user ? user.id : ''} />
                <InputCard id='3' typeComponent='field' typeInput='text' body='Name' value={user ? user.name : ''} />
                <InputCard id='4' typeComponent='field' typeInput='text' body='User ID' value={user ? user.userid : ''} />
                <InputCard id='5' typeComponent='field' typeInput='email' body='Email Address' value={user ? user.email : ''} />
                <InputCard id='6' typeComponent='textarea' typeInput='' body='Bio' value={user ? user.bio : ''} />
                <InputCard id='7' typeComponent='field' typeInput='password' body='Old Password' value='' />
                <InputCard id='8' typeComponent='field' typeInput='password' body='New Password' value='' />
                <InputCard id='9' typeComponent='field' typeInput='password' body='Verify New Password' value='' />
                <button className='w-100 btn btn-lg btn-primary'>Save</button>
            </div>
        </>
    );
}
