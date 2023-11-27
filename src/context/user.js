import { createContext, useState, useCallback } from 'react';
import axios from 'axios';

const UserContext = createContext();

const LoginStatus = {
    OK: 0,
    BAD_PASSWORD: 1,
    NO_USER: 2
};

function Provider({ children }) {
    const URL = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_JSON : process.env.REACT_APP_PROD_JSON;
    const [user, setUser] = useState(null);
    const resetUser = () => setUser(null);
    const fetchUser = useCallback(async (userId, password) => {
        const tempUser = {};

        try {
            const response = await axios.get(`${URL}/users?userid=${userId}&password=${password}`);

            if (response.data.length === 1) {
                tempUser.status = LoginStatus.OK;
                tempUser.info = response.data[0];
                setUser(response.data[0]);
            } else {
                const checkUserId = await axios.get(`${URL}/users?userid=${userId}`);

                if (checkUserId.data.length === 1) {
                    tempUser.status = LoginStatus.BAD_PASSWORD;
                    tempUser.info = checkUserId.data[0];
                } else {
                    tempUser.status = LoginStatus.NO_USER;
                    tempUser.info = {};
                }

                setUser(null);
            }

            return tempUser;
        } catch (error) {
            if (error.response) {
                // Disable ESLint temporarily - comments must be /**/
                /* eslint-disable no-console */
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) console.log(error.request);
            else console.log(error.message);
            /* eslint-disable no-console */

            return null;
        }
    }, []);
    const editUserById = async (id, newValues) => {
        const response = await axios.put(`${URL}/users/${id}`, newValues);
        const updatedUser = response.data;

        setUser(updatedUser);
    };
    const createUser = async (values) => {
        const response = await axios.post(`${URL}/users`, values);
        const newUser = response.data;

        setUser(newUser);
    };
    const valueToShare = {
        user,
        editUserById,
        createUser,
        fetchUser,
        resetUser
    };

    return <UserContext.Provider value={valueToShare}>{children}</UserContext.Provider>;
}

export { Provider, LoginStatus };
export default UserContext;
