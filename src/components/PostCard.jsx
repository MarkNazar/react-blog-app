import React from 'react';

//fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Avatar from './Avatar';
import { Link } from 'react-router-dom';

//icons
import HeartIcon from '../assets/heart.svg';
import HeartSolidIcon from '../assets/heartsolid.svg';
import CommentIcon from '../assets/comment.svg';

const PostCard = ({ document }) => {
  const {
    title,
    description,
    featuredImage,
    createdBy,
    createdAt,
    comments,
    category,
    id,
  } = document;
  return (
    <article className='border border-black bg-white'>
      <div className='relative'>
        <img
          className='h-[200px] w-full object-cover'
          src={featuredImage}
          alt='featured'
        />
        <div className='absolute bottom-0 left-0 bg-black text-white py-1 px-2 text-[12px] m-2'>
          {category}
        </div>
      </div>
      <div className='p-4'>
        <h3 className='font-medium mb-4'>{title}</h3>
        <div className='flex items-center gap-2 mb-4'>
          <Avatar customStyle={'w-[30px] h-[30px]'} src={createdBy.photoURL} />
          <div>
            <p className='text-[14px] text-gray-600'>{createdBy.displayName}</p>
            <p className='text-[14px] text-gray-600'>
              {formatDistanceToNow(createdAt.toDate(), { addSuffix: true })}
            </p>
          </div>
        </div>
        <p className='mb-4'>
          {description.substring(0, 50)}
          {description.length > 50 ? '...' : null}
        </p>
        <div className='flex gap-1 items-center my-2'>
          <img className='w-[15px]' src={HeartIcon} alt='like' />
          <span className='font-[15px]'>{document.likes.length}</span>
          <img className='w-[15px] ml-2' src={CommentIcon} alt='comment' />
          <span className='font-[15px]'>{document.comments.length}</span>
        </div>
        <Link
          to={`/post/${id}`}
          className='px-4 py-2 mt-4 inline-block bg-white border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
        >
          Read More
        </Link>
      </div>
    </article>
  );
};

export default PostCard;
