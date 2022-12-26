import { useState, useEffect, useRef } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export const useCollection = (col, _query) => {
  const [documents, setDocuments] = useState(null);
  const [isPending, setIspending] = useState(false);
  const [error, setError] = useState(null);

  const q = useRef(_query).current;

  useEffect(() => {
    let dbRef = collection(db, col);

    if (q) {
      dbRef = query(dbRef, where(...q));
    }
    setIspending(true);
    const unsub = onSnapshot(
      dbRef,
      snapshot => {
        let results = [];
        snapshot.docs.forEach(doc => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(prev => {
          return results;
        });
        setIspending(false);
        setError(null);
      },
      error => {
        setIspending(false);
        setError(error.message);
      }
    );

    return () => unsub();
  }, [col, q]);

  return { documents, error, isPending };
};
