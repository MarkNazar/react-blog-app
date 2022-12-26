import { auth, db } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuthContext } from './useAuthContext';
import { useEffect, useState } from 'react';

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async ({ email, password }) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error('Could not complete login');
      }

      const userRef = doc(db, 'users', res.user.uid);
      await updateDoc(userRef, { online: true });

      dispatch({ type: 'LOGIN', payload: res.user });

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

  return { login, error, isPending };
};
