import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

import { useFirestore } from '../../hooks/useFirestore';

const categories = [
  { value: 'technology', label: 'Technology' },
  { value: 'travel', label: 'Travel' },
  { value: 'health', label: 'Health' },
  { value: 'sports', label: 'Sports' },
  { value: 'music', label: 'Music' },
  { value: 'business', label: 'Business' },
  { value: 'news', label: 'News' },
];

const Create = () => {
  const formData = {
    title: '',
    description: '',
    category: '',
    featuredImage: '',
  };
  const [post, setPost] = useState(formData);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { user } = useAuthContext();
  const { response, addDocument } = useFirestore('posts');

  const navigate = useNavigate();

  const handleInputChange = e => {
    const { name, value } = e.target;

    setPost(prev => {
      return { ...prev, [name]: value };
    });
  };

  const handleFileChange = e => {
    setPost(prev => {
      return { ...prev, featuredImage: null };
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

    setPost(prev => {
      return { ...prev, featuredImage: selected };
    });
  };

  const handleFormSubmit = async e => {
    e.preventDefault();

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const newPost = {
      ...post,
      createdBy,
      comments: [],
      likes: [],
    };

    if (thumbnailError === null) {
      addDocument(newPost);
    }
  };

  useEffect(() => {
    if (response.success) {
      navigate('/');
    }
  }, [response, navigate]);

  return (
    <div className='flex flex-col justify-center max-w-[600px] mx-auto px-2 min-h-[calc(100vh_-_122px)]'>
      <h1 className='text-center'>Create A New Post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleFormSubmit}>
        <label>
          <span className='inline-block mb-2'>
            Title:<small className='ml-2'>Max of 100 characters.</small>
          </span>
          <input
            className='block w-full border border-black p-2 outline-none'
            required
            maxLength='100'
            type='text'
            name='title'
            onChange={e => handleInputChange(e)}
          />
        </label>
        <label>
          <span className='inline-block mb-2'>Description:</span>
          <textarea
            rows='8'
            className='block w-full border border-black p-2 outline-none'
            required
            type='text'
            name='description'
            onChange={e => handleInputChange(e)}
          />
        </label>
        <label>
          <span className='inline-block mb-2'>Project category:</span>
          <select
            className='block w-full border border-black p-2 outline-none'
            required
            name='category'
            onChange={e => handleInputChange(e)}
          >
            <option value='' selected disabled>
              Select a category
            </option>
            {categories.map(category => {
              return (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          <span className='inline-block mb-2'>Featured Image:</span>
          <input
            className='block w-full border border-black p-2 outline-none'
            required
            type='file'
            name='featuredImage'
            onChange={handleFileChange}
          />
          {thumbnailError && (
            <div className='mt-2 p-2 bg-red-200 text-red-700 text-center text-sm'>
              {thumbnailError}
            </div>
          )}
        </label>

        {!response.isPending && (
          <button className='px-4 py-2 bg-white border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
            Create Post
          </button>
        )}
        {response.isPending && (
          <button
            disabled
            className='px-4 py-2 bg-white border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
          >
            Creating Post...
          </button>
        )}
      </form>
    </div>
  );
};

export default Create;
