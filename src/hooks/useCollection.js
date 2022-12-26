import { useState, useEffect, useRef } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

export const useCollection = (col, _query, _order) => {
  const [documents, setDocuments] = useState(null);
  const [isPending, setIspending] = useState(false);
  const [error, setError] = useState(null);

  const q = useRef(_query).current;
  const o = useRef(_order).current;

  useEffect(() => {
    let dbRef = collection(db, col);

    if (q) {
      dbRef = query(dbRef, where(...q));
    }

    if (o) {
      dbRef = query(dbRef, orderBy(...o));
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
