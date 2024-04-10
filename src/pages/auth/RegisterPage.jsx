import { useEffect, useState } from "react";
import { REGISTER_URL } from "../../services/api/constants";
import Input from "../../components/ui/Input";
import router from "../../router/router";

const RegisterPage = () => {
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

            const res = await fetch(REGISTER_URL, {
                method: 'POST',
                body: formdata
            });

            const resData = await res.json();

                        // если запрос провалился показать ошибки
            if (!res.ok) {
                for (let i in resData.violations) {
                    const newError = i + ': ' + resData.violations[i].message;
                    setErrors([])
                    setErrors((prevErrors) => [...prevErrors, newError])
                }
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
            <h2 className="text-3xl text-white">Register</h2>
            <Input placeholder={ 'username' } handleInput={handleUsernameInput} />
            <Input type="password" placeholder={ 'password' } handleInput={handlePasswordInput} />
            <button type="submit" className="bg-indigo-600 self-end p-2 rounded text-white">Register</button>
            {errors.length && <p className="text-red-500">{ errors }</p>}
        </form>
        </div>
    );
}

export default RegisterPage;