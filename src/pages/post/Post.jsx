import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';

//component
import Avatar from '../../components/Avatar';
import PostComment from './PostComment';

import { useAuthContext } from '../../hooks/useAuthContext';
import PostLikes from './PostLikes';
import { useFirestore } from '../../hooks/useFirestore';

const Post = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const { document, error } = useDocument('posts', id);
  const { deleteDocument, response } = useFirestore('posts');
  const navigate = useNavigate();

  const handleDeletePost = () => {
    deleteDocument(document.id);
  };

  useEffect(() => {
    if (response.success) {
      navigate(-1);
    }
  }, [response.success, navigate]);

  if (!document && error) {
    setTimeout(() => {
      navigate('/');
    }, 2000);
    return (
      <div className='max-w-screen-lg mx-auto mt-2 p-2 bg-red-200 text-center text-sm'>
        {error}. Redirecting to Home....
      </div>
    );
  }

  if (!document) {
    return <div className='max-w-screen-lg mx-auto py-6'>Loading...</div>;
  }
  return (
    <div className='max-w-screen-lg mx-auto py-6 px-2 min-h-[calc(100vh_-_122px)]'>
      <main>
        {user.uid === document.createdBy.id && (
          <div className='flex justify-end mb-4'>
            <button
              className='px-4 py-2 mt-4 inline-block bg-white border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
              onClick={handleDeletePost}
            >
              Delete Post
            </button>
          </div>
        )}

        <article>
          <div>
            <img
              className='w-full h-[400px] object-cover'
              src={document.featuredImage}
              alt='featured'
            />
          </div>
          <h1 className='text-center font-medium mb-1'>{document.title}</h1>
          <div className='text-center'>
            <div className='inline-block mx-auto bg-black text-white py-1 px-2 text-[12px] mb-4'>
              {document.category}
            </div>
            <PostLikes document={document} user={user} />
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <Avatar
                customStyle={'w-[30px] h-[30px]'}
                src={document.createdBy.photoURL}
              />
              <div>
                <p className='text-[14px] text-gray-600'>
                  {document.createdBy.displayName}
                </p>
                <p className='text-[14px] text-gray-600'>
                  {formatDistanceToNow(document.createdAt.toDate(), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
            <p className='mt-4'>{document.description}</p>
          </div>
        </article>
      </main>
      <PostComment post={document} />
    </div>
  );
};

export default Post;
