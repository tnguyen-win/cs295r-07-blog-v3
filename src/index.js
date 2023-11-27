import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import ReactDOM from 'react-dom/client';
import { Provider as UserProvider } from './context/user';
import { Provider as PostsProvider } from './context/posts';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const URL = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_ROUTES : process.env.REACT_APP_PROD_ROUTES;

root.render(
    <UserProvider>
        <PostsProvider>
            <BrowserRouter basename={URL}>
                <App />
            </BrowserRouter>
        </PostsProvider>
    </UserProvider>
);
