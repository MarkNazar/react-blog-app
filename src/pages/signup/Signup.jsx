import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../../hooks/useSignup';

const Signup = () => {
  const formData = {
    displayName: '',
    email: '',
    password: '',
    avatar: null,
  };

  const [form, setForm] = useState(formData);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, error, isPending } = useSignup();

  const handleInputChange = e => {
    const { name, value } = e.target;
    setForm(prev => {
      return { ...prev, [name]: value };
    });
  };

  const handleFileChange = e => {
    setForm(prev => {
      return { ...prev, avatar: null };
    });

    let selected = e.target.files[0];

    if (!selected) {
      setThumbnailError('Please select a file');
      return;
    }

    if (!selected.type.includes('image')) {
      setThumbnailError('File must be an image');
      return;
    }

    if (selected.size > 200000) {
      setThumbnailError('Image must be less than 200kb');
      return;
    }

    setThumbnailError(null);

    setForm(prev => {
      return { ...prev, avatar: selected };
    });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if (thumbnailError === null) {
      signup(form);
    }
  };

  return (
    <div className='max-w-[400px] mx-auto mt-20'>
      <h1 className='text-center'>Sign Up</h1>
      <form onSubmit={handleFormSubmit} className='flex flex-col gap-4 h-full'>
        <label>
          <span className='inline-block mb-2'>Display Name:</span>
          <input
            className='block w-full border border-black p-2 outline-none'
            required
            type='text'
            name='displayName'
            value={form.displayName}
            onChange={e => handleInputChange(e)}
          />
        </label>
        <label>
          <span className='inline-block mb-2'>Email Address:</span>
          <input
            className='block w-full border border-black p-2 outline-none'
            required
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
            required
            type='password'
            name='password'
            value={form.password}
            onChange={e => handleInputChange(e)}
          />
        </label>
        <label>
          <span className='inline-block mb-2'>Profile Picture:</span>
          <input
            className='block w-full border border-black p-2 outline-none'
            required
            type='file'
            name='avatar'
            onChange={handleFileChange}
          />
          {thumbnailError && (
            <div className='mt-2 p-2 bg-red-200 text-red-700 text-center text-sm'>
              {thumbnailError}
            </div>
          )}
        </label>
        {!isPending && (
          <button className='px-4 py-2 bg-white border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
            Sign Up
          </button>
        )}

        {isPending && (
          <button
            disabled
            className='px-4 py-2 bg-white border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
          >
            Signing up...
          </button>
        )}
        {error && <div className='mt-2 p-2 bg-red-200 text-center text-sm'>{error}</div>}
      </form>
      <p className='text-center mt-6'>
        ALready have an account?{' '}
        <Link to='/login' className='font-medium border-b-2 pb-1 border-black'>
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
