import {
  collection,
  onSnapshot,
  query,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  orderBy,
  Timestamp,
  runTransaction,
  where,
  addDoc,
  deleteDoc,
  limit,
} from "firebase/firestore";

import { db } from "@/lib/firebase/clientApp";

// Generic collection operations
export async function getDocuments(collectionPath: string, filters: any = {}) {
  let q = query(collection(db, collectionPath));
  
  // Apply filters if provided
  if (filters.orderBy) {
    q = query(q, orderBy(filters.orderBy.field, filters.orderBy.direction || "desc"));
  }
  if (filters.where) {
    q = query(q, where(filters.where.field, filters.where.operator, filters.where.value));
  }
  if (filters.limit) {
    q = query(q, limit(filters.limit));
  }

  const results = await getDocs(q);
  return results.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    // Convert Firestore timestamps to regular dates
    ...(doc.data().timestamp && { timestamp: doc.data().timestamp.toDate() }),
    ...(doc.data().createdAt && { createdAt: doc.data().createdAt.toDate() }),
    ...(doc.data().updatedAt && { updatedAt: doc.data().updatedAt.toDate() }),
  }));
}

export function getDocumentsSnapshot(collectionPath: string, cb: (docs: any[]) => void, filters: any = {}) {
  if (typeof cb !== "function") {
    console.log("Error: The callback parameter is not a function");
    return;
  }

  let q = query(collection(db, collectionPath));
  
  // Apply filters if provided
  if (filters.orderBy) {
    q = query(q, orderBy(filters.orderBy.field, filters.orderBy.direction || "desc"));
  }
  if (filters.where) {
    q = query(q, where(filters.where.field, filters.where.operator, filters.where.value));
  }
  if (filters.limit) {
    q = query(q, limit(filters.limit));
  }

  return onSnapshot(q, (querySnapshot) => {
    const results = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      // Convert Firestore timestamps to regular dates
      ...(doc.data().timestamp && { timestamp: doc.data().timestamp.toDate() }),
      ...(doc.data().createdAt && { createdAt: doc.data().createdAt.toDate() }),
      ...(doc.data().updatedAt && { updatedAt: doc.data().updatedAt.toDate() }),
    }));

    cb(results);
  });
}

export async function getDocumentById(collectionPath: string, documentId: string) {
  if (!documentId) {
    console.log("Error: Invalid ID received: ", documentId);
    throw new Error("Invalid ID received: " + documentId);
  }
  
  const docRef = doc(db, collectionPath, documentId);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    throw new Error("Document not found");
  }
  
  const data = docSnap.data();
  return {
    id: docSnap.id,
    ...data,
    // Convert Firestore timestamps to regular dates
    ...(data.timestamp && { timestamp: data.timestamp.toDate() }),
    ...(data.createdAt && { createdAt: data.createdAt.toDate() }),
    ...(data.updatedAt && { updatedAt: data.updatedAt.toDate() }),
  };
}

export function getDocumentSnapshotById(collectionPath: string, documentId: string, cb: (doc: any) => void) {
  if (!documentId) {
    console.log("Error: Invalid ID received: ", documentId);
    return;
  }

  if (typeof cb !== "function") {
    console.log("Error: The callback parameter is not a function");
    return;
  }

  const docRef = doc(db, collectionPath, documentId);
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      cb({
        id: docSnap.id,
        ...data,
        // Convert Firestore timestamps to regular dates
        ...(data.timestamp && { timestamp: data.timestamp.toDate() }),
        ...(data.createdAt && { createdAt: data.createdAt.toDate() }),
        ...(data.updatedAt && { updatedAt: data.updatedAt.toDate() }),
      });
    } else {
      cb(null);
    }
  });
}

export async function addDocument(collectionPath: string, data: any) {
  try {
    const docRef = await addDoc(collection(db, collectionPath), {
      ...data,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

export async function updateDocument(collectionPath: string, documentId: string, data: any) {
  try {
    const docRef = doc(db, collectionPath, documentId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.fromDate(new Date()),
    });
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
}

export async function deleteDocument(collectionPath: string, documentId: string) {
  try {
    const docRef = doc(db, collectionPath, documentId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
}