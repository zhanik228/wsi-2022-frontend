import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';

import App from '../App';
import ErrorRouter from '../components/ErrorRouter';
import GamesPage from '../pages/games/GamesPage';
import RegisterPage from '../pages/auth/RegisterPage';
import SignOutPage from '../pages/auth/SignOutPage';
import LoginPage from '../pages/auth/LoginPage';
import GamePage from '../pages/games/GamePage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorRouter />,
        children: [
            {
                path: '/',
                element: <GamesPage />,
            },
            {
                path: 'games',
                element: <GamesPage />,
            },
            {
                path: 'signup',
                element: <RegisterPage />
            },
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'signout',
                element: <SignOutPage />
            },
            {
                path: 'game/:slug',
                element: <GamePage />
            }
        ]
    }
]);

export default router;