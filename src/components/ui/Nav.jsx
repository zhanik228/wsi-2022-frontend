import { Link, NavLink } from 'react-router-dom';

const links = [
    {
        name: 'Discover Games',
        path: 'games',
    }
]

const Nav = () => {

    const determineClassName = ( isActive, isPending ) => {
        let classes = "p-1 px-2 block text-white rounded";
        if (isActive || isPending) {
            classes += " bg-gray-900";
        }
        return classes;
    }

    return (
        <nav>
            <ul className="list-style-none">
                {links.map((link) =>                 
                <li key={link.path}>
                    <NavLink 
                        className={({ isActive, isPending }) => determineClassName(isActive, isPending)}
                        to={ link.path }
                    >{ link.name }
                    </NavLink>
                </li>
            )}
            </ul>
        </nav>
    );
}

export default Nav;