import React from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import PostLists from '../../components/PostLists';
import UserLists from './UserLists';

//pages
import UserSidebar from './UserSidebar';

const Home = () => {
  const { user } = useAuthContext();
  return (
    <section className='container mx-auto px-2 min-h-[calc(100vh_-_122px)]'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10'>
        <div className='sm:order-1 order-2'>
          <UserSidebar user={user} />
          <UserLists user={user} />
        </div>
        <PostLists />
      </div>
    </section>
  );
};

export default Home;
