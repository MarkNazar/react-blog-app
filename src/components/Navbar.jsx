import { Link, NavLink } from 'react-router-dom';

import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

//assets
import menuIcon from '../assets/menu.svg';
import { useState } from 'react';

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout, error, isPending } = useLogout();
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggleMenu = () => {
    setToggleMenu(prev => !prev);
  };

  return (
    <div className='fixed top-0 left-0 right-0 px-2 z-40'>
      <div className='bg-white shadow-sm'>
        <div className='flex justify-end items-center container mx-auto py-2'>
          <h4 className='text-[36px] font-semibold mr-auto'>
            <Link to='/'>Bl.g</Link>
          </h4>
          <nav>
            <ul className='hidden sm:flex items-center gap-2 text-lg'>
              {user && (
                <>
                  <li>
                    <NavLink to='/'>Home</NavLink>
                  </li>
                  <li>
                    <NavLink to='/profile'>Profile</NavLink>
                  </li>
                  <li>
                    <NavLink to='/create'>Add New Post</NavLink>
                  </li>
                </>
              )}
              <li>
                {!user && (
                  <Link
                    to='/signup'
                    className='px-4 py-2 bg-white border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                  >
                    Signup
                  </Link>
                )}
                {user && (
                  <button
                    className='px-4 py-2 bg-white border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                    onClick={logout}
                  >
                    Logout
                  </button>
                )}
              </li>
            </ul>
          </nav>
          <img
            className='w-8 sm:hidden cursor-pointer'
            src={menuIcon}
            alt='menu'
            onClick={handleToggleMenu}
          />
        </div>
      </div>
      <div
        className={`${
          toggleMenu ? 'sm:hidden' : 'hidden'
        } mobile-menu m-1 p-2 border bg-white z-[999] absolute top-[70px] left-0 right-0`}
      >
        <nav>
          <ul className='flex flex-col gap-2 text-lg ' onClick={handleToggleMenu}>
            {user && (
              <>
                <li>
                  <NavLink to='/'>Home</NavLink>
                </li>
                <li>
                  <NavLink to='/profile'>Profile</NavLink>
                </li>
                <li>
                  <NavLink to='/create'>Add New Post</NavLink>
                </li>
              </>
            )}
            <li>
              {!user && (
                <Link to='/signup' className=''>
                  Signup
                </Link>
              )}
              {user && (
                <button className='w-full px-4 py-1 bg-black text-white' onClick={logout}>
                  Logout
                </button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
