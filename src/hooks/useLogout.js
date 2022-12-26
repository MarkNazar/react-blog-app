import { auth, db } from '../firebase/config';
import { updateDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useAuthContext } from './useAuthContext';
import { useState } from 'react';
import { useEffect } from 'react';

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { user, dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      const dbRef = doc(db, 'users', user.uid);
      await updateDoc(dbRef, { online: false });

      await signOut(auth);

      dispatch({ type: 'LOGOUT' });

      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    setIsCancelled(false);

    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
};
