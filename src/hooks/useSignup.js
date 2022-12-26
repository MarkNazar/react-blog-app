import { useState, useEffect } from 'react';
import { auth, storage, db } from '../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useAuthContext } from './useAuthContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async ({ email, password, displayName, avatar }) => {
    setError(null);
    setIsPending(true);

    //signup
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error('Could not complete signup');
      }

      // upload user image

      const uploadPath = `thumbnail/${res.user.uid}/${avatar.name}`;
      const storageRef = ref(storage, uploadPath);

      const uploadTask = uploadBytesResumable(storageRef, avatar);

      uploadTask.on(
        'state_changed',
        snapshot => {
          // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => {
          setError(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            updateProfile(auth.currentUser, {
              displayName,
              photoURL: downloadURL,
            });

            const userRef = doc(db, 'users', res.user.uid);
            setDoc(userRef, { online: true, displayName, photoURL: downloadURL });
            dispatch({ type: 'LOGIN', payload: res.user });
            if (!isCancelled) {
              setError(null);
              setIsPending(false);
            }
          });
        }
      );
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

  return { signup, error, isPending };
};
