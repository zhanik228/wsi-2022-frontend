import { useRouteError } from 'react-router-dom'

const ErrorRouter = () => {
    const error = useRouteError();
    console.error(error)

    return (
        <div className='text-center'>
            <h1>Упс!</h1>
            <p>Извините мы пытались поймать но, страница убежала от нас</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
}

export default ErrorRouter;