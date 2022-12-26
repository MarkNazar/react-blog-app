import { useState } from 'react';
import { useCollection } from '../hooks/useCollection';
import { useAuthContext } from '../hooks/useAuthContext';

//components
import PostCard from './PostCard';
import FilterPost from '../pages/home/FilterPost';

const PostLists = () => {
  const {
    documents: posts,
    error,
    isPending,
  } = useCollection('posts', null, ['createdAt', 'desc']);
  const { user } = useAuthContext();

  const [currentFilter, setCurrentFilter] = useState('all');

  const changeFilter = newFilter => {
    setCurrentFilter(prev => {
      return newFilter;
    });
  };

  if (!posts && error) {
    return (
      <div className='max-w-screen-lg mx-auto mt-2 p-2 bg-red-200 text-center text-sm'>
        {error}
      </div>
    );
  }

  const filteredPosts = posts?.filter(post => {
    if (currentFilter === 'all') {
      return true;
    } else if (currentFilter === 'mine') {
      return post.createdBy.id === user.uid;
    } else {
      return post.category === currentFilter;
    }
  });

  return (
    <div className='sm:order-2 order-1 sm:col-start-2 sm:col-span-4'>
      {isPending && <div className='max-w-screen-lg mx-auto py-6'>Loading...</div>}
      {posts && <FilterPost currentFilter={currentFilter} changeFilter={changeFilter} />}
      {filteredPosts?.length === 0 && <div>Post category is empty.</div>}
      <div className='grid lg:grid-cols-2 xl:grid-cols-3 gap-8'>
        {filteredPosts?.map(document => {
          return <PostCard key={document.id} document={document} />;
        })}
      </div>
    </div>
  );
};

export default PostLists;
