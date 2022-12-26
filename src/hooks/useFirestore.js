import { useEffect, useReducer, useState } from 'react';

//firebase
import { db, storage } from '../firebase/config';
import {
  addDoc,
  collection,
  Timestamp,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, error: null, success: null };
    case 'ADDED_DOCUMENT':
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };
    case 'UPDATED_DOCUMENT':
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };
    case 'DELETED_DOCUMENT':
      return { isPending: false, error: null, success: true, document: null };
    case 'ERROR':
      return { document: null, isPending: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const useFirestore = col => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const dbRef = collection(db, col);

  const dispatchIfNotCancelled = action => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const addDocument = async doc => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const createdAt = Timestamp.fromDate(new Date());

      //setup upload featured image
      const uploadPath = `featured-images/${Math.random() + doc.featuredImage.name}`;
      const storageRef = ref(storage, uploadPath);
      const uploadTask = uploadBytesResumable(storageRef, doc.featuredImage);

      uploadTask.on(
        'state_changed',
        snapshot => {
          // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => {
          dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const addedDocument = await addDoc(dbRef, {
            ...doc,
            createdAt,
            featuredImage: downloadURL,
          });
          dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument });
        }
      );
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
    }
  };

  const updateDocument = async (id, updates) => {
    dispatch({ type: 'IS_PENDING' });
    try {
      const docRef = doc(db, col, id);
      const updatedDocument = await updateDoc(docRef, updates);
      dispatchIfNotCancelled({ type: 'UPDATED_DOCUMENT', payload: updatedDocument });
      return updateDocument;
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
      return null;
    }
  };

  const deleteDocument = async id => {
    dispatch({ type: 'IS_PENDING' });

    try {
      await deleteDoc(doc(db, col, id));
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' });
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
    }
  };

  useEffect(() => {
    setIsCancelled(false);

    return () => setIsCancelled(true);
  }, []);

  return { response, addDocument, updateDocument, deleteDocument };
};
