import { Link } from 'react-router-dom';
import { useState } from 'react';

import { useLogin } from '../../hooks/useLogin';

const Login = () => {
  const formData = {
    email: '',
    password: '',
  };

  const [form, setForm] = useState(formData);
  const { login, error, isPending } = useLogin();

  const handleInputChange = e => {
    const { name, value } = e.target;
    setForm(prev => {
      return { ...prev, [name]: value };
    });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    login(form);
  };

  return (
    <div className='flex flex-col justify-center max-w-[400px] mx-auto px-2 min-h-[calc(100vh_-_122px)]'>
      <h1 className='text-center'>Login</h1>
      <form onSubmit={handleFormSubmit} className='flex flex-col gap-4 h-full'>
        <label>
          <span className='inline-block mb-2'>Email Address:</span>
          <input
            className='block w-full border border-black p-2 outline-none'
            type='email'
            name='email'
            value={form.email}
            onChange={e => handleInputChange(e)}
          />
        </label>
        <label>
          <span className='inline-block mb-2'>Password:</span>
          <input
            className='block w-full border border-black p-2 outline-none'
            type='password'
            name='password'
            value={form.password}
            onChange={e => handleInputChange(e)}
          />
        </label>
        {!isPending && (
          <button className='px-4 py-2 bg-white border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
            Login
          </button>
        )}
        {isPending && (
          <button
            disabled
            className='px-4 py-2 bg-white border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
          >
            Logging in...
          </button>
        )}

        {error && <div className='mt-2 p-2 bg-red-200 text-center text-sm'>{error}</div>}
      </form>
      <p className='text-center mt-6'>
        Don't have an account?{' '}
        <Link to='/signup' className='font-medium border-b-2 pb-1 border-black'>
          Signup now
        </Link>
      </p>
    </div>
  );
};

export default Login;
