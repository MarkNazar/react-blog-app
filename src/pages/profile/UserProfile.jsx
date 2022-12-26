import { Link, useParams } from 'react-router-dom';
import { useCollection } from '../../hooks/useCollection';

//component
import Avatar from '../../components/Avatar';
import PostCard from '../../components/PostCard';
import { useDocument } from '../../hooks/useDocument';

const UserProfile = () => {
  const { id } = useParams();
  const {
    documents: posts,
    error,
    isPending,
  } = useCollection('posts', ['createdBy.id', '==', id]);
  const { document: user } = useDocument('users', id);

  if (!posts && error) {
    return (
      <div className='max-w-screen-lg mx-auto mt-2 p-2 bg-red-200 text-center text-sm'>
        {error}
      </div>
    );
  }

  return (
    <section className='container mx-auto py-10'>
      {user && (
        <>
          <div className='mx-auto text-center '>
            <h1 className='text-center font-medium'>{user?.displayName}'s Profile</h1>
            <div className='w-60 mx-auto px-4 py-6 bg-white border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
              <Avatar customStyle={'w-[60px] h-[60px] mx-auto'} src={user?.photoURL} />

              <p className='text-md mt-4'>{user?.displayName}</p>
              <p className='text-md mt-4'>{user?.online ? 'Online' : 'Offline'}</p>
            </div>
          </div>
          <div className='mt-10'>
            <h2>Posts</h2>
            {isPending && <div className='max-w-screen-lg py-6'>Loading...</div>}
            {posts?.length < 1 && <div className='mt-2 text-sm'>No posts found.</div>}

            <div className='grid grid-cols-3 gap-4'>
              {posts?.map(
                ({
                  title,
                  description,
                  featuredImage,
                  createdBy,
                  createdAt,
                  comments,
                  category,
                  id,
                }) => {
                  return (
                    <article key={id} className='border border-black bg-white'>
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
                        <h3 className='font-medium mb-[2px] '>{title}</h3>
                        <p>
                          {description.substring(0, 50)}
                          {description.length > 50 ? '...' : null}
                        </p>
                        <Link
                          to={`/post/${id}`}
                          className='px-4 py-2 mt-4 inline-block bg-white border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                        >
                          Read More
                        </Link>
                      </div>
                    </article>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default UserProfile;
