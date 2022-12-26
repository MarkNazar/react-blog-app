import React from 'react';

import { arrayRemove } from 'firebase/firestore';
import { useFirestore } from '../../hooks/useFirestore';

//icons
import Heart from '../../assets/heart.svg';
import HeartSolid from '../../assets/heartsolid.svg';

const PostLikes = ({ document, user }) => {
  const { updateDocument } = useFirestore('posts');
  const handleLikePost = async () => {
    // const updates = {
    //   id: user.uid,
    //   displayName: user.displayName,
    //   photoURL: user.photoURL,
    // };

    // await updateDocument(document.id, { likes: arrayRemove[...document.likes, updates] });
    if (document.likes.includes(user.uid)) {
      await updateDocument(document.id, { likes: arrayRemove(user.uid) });
    } else {
      await updateDocument(document.id, { likes: [...document.likes, user.uid] });
    }
  };
  return (
    <div className='flex items-center justify-center gap-1 mb-6'>
      <img
        className='w-6 cursor-pointer'
        src={!document.likes.includes(user.uid) ? Heart : HeartSolid}
        alt='heart'
        onClick={handleLikePost}
      />
      <span className='font-medium'>
        {document.likes.length === 0 ? null : document.likes.length}
      </span>
    </div>
  );
};

export default PostLikes;
