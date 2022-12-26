import React from 'react';
import { documentId } from 'firebase/firestore';
import { useCollection } from '../../hooks/useCollection';
//components
import Avatar from '../../components/Avatar';
import { Link } from 'react-router-dom';

const UserLists = ({ user }) => {
  const { documents, error, isPending } = useCollection('users', [
    documentId(),
    '!=',
    user.uid,
  ]);

  const onlineUsers = documents?.filter(document => document.online);

  return (
    <div>
      <div className='px-4 py-6 bg-white border border-gray-200'>
        <h3 className='border-b pb-2 mb-4'>Users</h3>
        <div className='overflow-y-auto h-60 '>
          {documents?.map(user => {
            return (
              <Link
                to={`/profile/${user.id}`}
                key={user.id}
                className='flex items-center gap-2 mb-4'
              >
                <div className='relative'>
                  <Avatar customStyle={'w-[40px] h-[40px]'} src={user.photoURL} />
                  {user.online && (
                    <div className='w-[10px] h-[10px] absolute top-0 left-0 bg-green-500 border border-white rounded-full'></div>
                  )}
                </div>

                <div>
                  <p className='text-[14px] text-gray-600'>{user.displayName}</p>
                </div>
              </Link>
            );
          })}
        </div>
        {onlineUsers && (
          <div className='text-gray-400 mt-4 text-sm'>
            Online User{onlineUsers.length > 1 ? 's' : null}: {onlineUsers.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLists;
