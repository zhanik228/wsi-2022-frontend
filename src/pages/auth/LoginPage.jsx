import { useEffect, useState } from "react";
import { LOGIN_URL, REGISTER_URL } from "../../services/api/constants";
import Input from "../../components/ui/Input";
import router from "../../router/router";

const LoginPage = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.navigate('/');
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formdata = new FormData();
            formdata.append('username', username);
            formdata.append('password', password);

            const res = await fetch(LOGIN_URL, {
                method: 'POST',
                body: formdata
            });

            const resData = await res.json();

            // если запрос провалился показать ошибки
            if (!res.ok) {
                setErrors(resData.message)
                return;
            }

            localStorage.setItem('token', resData.token);
            localStorage.setItem('username', username)
            router.navigate(0)

        } catch (error) {
            console.log(error.message)
            console.error(error);
        }
    }

    const handleUsernameInput = (value) => {
        setUsername(value)
    }

    
    const handlePasswordInput = (value) => {
        setPassword(value);
    }

    return (
        <div className="h-full flex justify-center items-center">
        <form onSubmit={ handleSubmit } className="bg-gray-800 w-96 p-10 gap-10 flex flex-col rounded">
            <h2 className="text-3xl text-white">Login</h2>
            <Input placeholder={ 'username' } handleInput={handleUsernameInput} value={username}/>
            <Input type="password" placeholder={ 'password' } handleInput={handlePasswordInput} value={password} />
            <button type="submit" className="bg-indigo-600 self-end p-2 rounded text-white">Login</button>
            {errors.length && <p className="text-red-500">{ errors }</p>}
        </form>
        </div>
    );
}

export default LoginPage;