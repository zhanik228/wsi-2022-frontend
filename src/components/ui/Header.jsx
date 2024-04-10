import { NavLink, Link } from "react-router-dom";
import Nav from "./Nav";

const Header = () => {
    return (
        <header 
            className="
                bg-gray-800
                px-2
                sm:px-4
                py-2
                sm:flex
                items-center
                justify-between
                gap-4
            "
        >
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-10">
            <h1 
                className="
                    text-white
                    text-center
                    sm:text-start
                    text-lg
                    sm:text-2xl
                    font-medium
                "
            ><Link to='/'>WorldSkills - Frontend</Link></h1>
            <Nav />
            </div>
            <div className="mt-4 sm:mt-0 flex justify-center sm:justify-start items-center gap-4">
                <NavLink
                    to={'login'} 
                    className="text-white text-sm "
                >Log in</NavLink>
                <NavLink
                    to={'signup'}
                    className="
                        text-white 
                        text-sm 
                        bg-indigo-600 
                        px-2 py-1 rounded
                        hover:opacity-[0.9]
                        hover:*:opacity-100
                    "
                >Sign up
                </NavLink>
            </div>
        </header>
    );
}

export default Header;