import { Link, NavLink } from 'react-router-dom';

import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout, error, isPending } = useLogout();
  return (
    <div className='bg-white shadow-sm'>
      <nav className='flex justify-end items-center container mx-auto py-2'>
        <h4 className='text-[36px] font-semibold mr-auto'>
          <Link to='/'>Bl.g</Link>
        </h4>
        <ul className='flex items-center gap-2 text-lg'>
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
    </div>
  );
};

export default Navbar;
