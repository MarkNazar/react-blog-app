import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

import { useFirestore } from '../../hooks/useFirestore';
import { Timestamp } from 'firebase/firestore';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import Avatar from '../../components/Avatar';

const PostComment = ({ post }) => {
  const [comment, setComment] = useState('');
  const { updateDocument } = useFirestore('posts');
  const { user } = useAuthContext();

  const handleFormSubmit = async e => {
    e.preventDefault();
    const updates = {
      content: comment,
      createdAt: Timestamp.fromDate(new Date()),
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: Math.random(),
    };
    await updateDocument(post.id, { comments: [...post.comments, updates] });
  };

  return (
    <div className='mt-4'>
      <h3>Post a reply</h3>
      <form className='flex flex-col gap-4 h-full' onSubmit={handleFormSubmit}>
        <label>
          <textarea
            rows='3'
            className='block w-full border border-black p-2 outline-none'
            required
            name='comment'
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </label>
        <button className='px-4 py-2 bg-white border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
          Submit
        </button>
      </form>
      <div className='mt-4'>
        <h3>Comments</h3>
        {post.comments.length > 0 &&
          post.comments.map(({ id, displayName, createdAt, photoURL, content }) => {
            return (
              <div className='border-b pb-2 mb-2' key={id}>
                <div>
                  <div className='flex items-center gap-2'>
                    <Avatar customStyle={'w-[30px] h-[30px]'} src={photoURL} />
                    <div>
                      <p className='text-[14px] text-gray-600'>{displayName}</p>
                      <p className='text-[14px] text-gray-600'>
                        {formatDistanceToNow(createdAt.toDate(), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                  <p className='ml-[38px] break-all'>{content}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PostComment;
