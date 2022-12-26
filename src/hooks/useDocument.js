import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useDocument = (col, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let dbRef = doc(db, col, id);
    const unsub = onSnapshot(
      dbRef,
      doc => {
        if (doc.data()) {
          setDocument({ ...doc.data(), id: doc.id });
          setError(null);
        } else {
          setError('Post not found');
        }
      },
      error => {
        setError('Theres some error on the request');
      }
    );

    return () => unsub();
  }, [col, id]);

  return { document, error };
};
