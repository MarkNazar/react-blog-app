import React from 'react';
import { useCollection } from '../../hooks/useCollection';
//component
import Avatar from '../../components/Avatar';

const UserSidebar = ({ user }) => {
  const { documents } = useCollection('posts', ['createdBy.id', '==', user.uid]);
  return (
    <div className='mb-10'>
      <div className='flex flex-col items-center px-4 py-6 bg-white border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
        {user.photoURL && <Avatar src={user.photoURL} customStyle={'w-[60px] h-[60x]'} />}
        <p className='mt-2'>{user.displayName}</p>
        <div className='w-full h-[1px] bg-slate-200 my-4'></div>
        <div>
          <p>
            {documents?.length} Post{documents?.length > 1 ? 's' : null}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
