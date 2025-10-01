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
  where,
  addDoc,
  deleteDoc,
  limit,
} from "firebase/firestore";

import type {
  DocumentData,
  OrderByDirection,
  QueryDocumentSnapshot,
  WhereFilterOp,
} from "firebase/firestore";

import { db } from "@/lib/firebase/clientApp";

type QueryFilters = {
  orderBy?: { field: string; direction?: OrderByDirection };
  where?: { field: string; operator: WhereFilterOp; value: unknown };
  limit?: number;
};

type NormalizedDocument = DocumentData & {
  id: string;
  timestamp?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

const toDateIfTimestamp = (value: unknown): Date | undefined => {
  if (value instanceof Timestamp) {
    return value.toDate();
  }

  return undefined;
};

const normalizeDocumentData = (
  id: string,
  data: DocumentData
): NormalizedDocument => {
  const normalized: NormalizedDocument = {
    id,
    ...data,
  };

  const timestamp = toDateIfTimestamp(data.timestamp);
  if (timestamp) {
    normalized.timestamp = timestamp;
  }

  const createdAt = toDateIfTimestamp(data.createdAt);
  if (createdAt) {
    normalized.createdAt = createdAt;
  }

  const updatedAt = toDateIfTimestamp(data.updatedAt);
  if (updatedAt) {
    normalized.updatedAt = updatedAt;
  }

  return normalized;
};

const normalizeQueryDocument = (
  snapshot: QueryDocumentSnapshot<DocumentData>
): NormalizedDocument => normalizeDocumentData(snapshot.id, snapshot.data());

// Generic collection operations
export async function getDocuments(
  collectionPath: string,
  filters: QueryFilters = {}
): Promise<NormalizedDocument[]> {
  let q = query(collection(db, collectionPath));

  // Apply filters if provided
  if (filters.orderBy) {
    q = query(
      q,
      orderBy(filters.orderBy.field, filters.orderBy.direction ?? "desc")
    );
  }
  if (filters.where) {
    q = query(
      q,
      where(filters.where.field, filters.where.operator, filters.where.value)
    );
  }
  if (filters.limit) {
    q = query(q, limit(filters.limit));
  }

  const results = await getDocs(q);
  return results.docs.map(normalizeQueryDocument);
}

export function getDocumentsSnapshot(
  collectionPath: string,
  cb: (docs: NormalizedDocument[]) => void,
  filters: QueryFilters = {}
) {
  if (typeof cb !== "function") {
    console.log("Error: The callback parameter is not a function");
    return;
  }

  let q = query(collection(db, collectionPath));

  // Apply filters if provided
  if (filters.orderBy) {
    q = query(
      q,
      orderBy(filters.orderBy.field, filters.orderBy.direction ?? "desc")
    );
  }
  if (filters.where) {
    q = query(
      q,
      where(filters.where.field, filters.where.operator, filters.where.value)
    );
  }
  if (filters.limit) {
    q = query(q, limit(filters.limit));
  }

  return onSnapshot(q, (querySnapshot) => {
    const results = querySnapshot.docs.map(normalizeQueryDocument);

    cb(results);
  });
}

export async function getDocumentById(
  collectionPath: string,
  documentId: string
): Promise<NormalizedDocument> {
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
  return normalizeDocumentData(docSnap.id, data);
}

export function getDocumentSnapshotById(
  collectionPath: string,
  documentId: string,
  cb: (doc: NormalizedDocument | null) => void
) {
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
      cb(normalizeDocumentData(docSnap.id, data));
    } else {
      cb(null);
    }
  });
}

export async function addDocument(
  collectionPath: string,
  data: DocumentData
): Promise<string> {
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

export async function updateDocument(
  collectionPath: string,
  documentId: string,
  data: Partial<DocumentData>
) {
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

export async function deleteDocument(
  collectionPath: string,
  documentId: string
) {
  try {
    const docRef = doc(db, collectionPath, documentId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
}
