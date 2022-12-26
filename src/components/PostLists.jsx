import React from 'react';

import { useCollection } from '../hooks/useCollection';

//components
import PostCard from './PostCard';

const PostLists = () => {
  const { documents: posts, error, isPending } = useCollection('posts');

  if (!posts && error) {
    return (
      <div className='max-w-screen-lg mx-auto mt-2 p-2 bg-red-200 text-center text-sm'>
        {error}
      </div>
    );
  }

  return (
    <div className='col-start-2 col-span-4'>
      {isPending && <div className='max-w-screen-lg mx-auto py-6'>Loading...</div>}
      <div className='grid grid-cols-3 gap-8'>
        {posts?.map(document => {
          return <PostCard key={document.id} document={document} />;
        })}
      </div>
    </div>
  );
};

export default PostLists;
