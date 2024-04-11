import { Outlet } from 'react-router-dom';

import './App.css';
import Header from './components/ui/Header';

const App = () => {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className='p-2 bg-gray-800 flex flex-col items-center sm:flex-row justify-between gap-5'>
        <h2 className='text-white text-xl text-center'>WorldSkills - Frontend</h2>
        <nav>
          <ul className="list-style-none flex">
            <li>
              <a className="p-1 px-2 block text-white rounded" href="/games">
                Discover Games
              </a>
            </li>
            <li>
              <a className="p-1 px-2 block text-white rounded" href="tel:87066609219">
                Contacts
              </a>
            </li>
          </ul>
        </nav>
        <p className='text-lg text-blue-300 font-bold'>Let the game begin!</p>
      </footer>
    </>
  );
}

export default App;
