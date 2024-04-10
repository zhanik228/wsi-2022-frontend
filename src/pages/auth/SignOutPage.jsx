import { useEffect, useState } from "react"
import { LOGOUT_URL } from "../../services/api/constants";
import router from "../../router/router";

const SignOutPage = () => {
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'))

    useEffect(() => {
        const logout = async () => {
            try {
                const res = await fetch(LOGOUT_URL, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const resData = await res.json();
                if (res.ok) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('username')
                    setLoading(false);
                    setSuccess(true);
                    setTimeout(() => {
                        router.navigate(0);
                    }, 10000);
                }
            } catch (error) {
                console.error(error);
            }
        }
        logout();
    }, [])

    return (
        <>
            {loading && <h2 className="text-xl">Loading...</h2>}
            {success && 
                <div className="p-2">
                    <h2 className="text-2xl">Sign Out</h2>
                    <div>
                        <h3 className="text-3xl">You have been successfully signed out</h3>
                    </div>
                </div>
            }
        </>
    )
}

export default SignOutPage;