import React from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import PostLists from '../../components/PostLists';
import UserLists from './UserLists';

//pages
import UserSidebar from './UserSidebar';

const Home = () => {
  const { user } = useAuthContext();
  return (
    <section className='container mx-auto'>
      <div className='grid grid-cols-6 gap-8 py-10'>
        <UserSidebar user={user} />
        <PostLists />
        <UserLists user={user} />
      </div>
    </section>
  );
};

export default Home;
