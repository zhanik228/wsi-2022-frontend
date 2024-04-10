import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';

import App from '../App';
import ErrorRouter from '../components/ErrorRouter';
import GamesPage from '../pages/games/GamesPage';

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
            }
        ]
    }
]);

export default router;