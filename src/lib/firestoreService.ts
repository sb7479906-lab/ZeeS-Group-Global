import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where
} from 'firebase/firestore';
import { db } from './firebase';
import { handleFirestoreError, OperationType } from './errorHandling';

export interface InquiryRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: 'pending' | 'reviewed' | 'in_progress' | 'completed' | 'archived';
  createdAt: string;
  userId?: string | null;
  userEmail?: string | null;
}

export interface ConsultationRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  preferredTopic: string;
  preferredDate?: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
  userId?: string | null;
}

// 1. Submit Inquiry to Firestore
export async function createInquiry(data: Omit<InquiryRecord, 'id'>): Promise<string> {
  const collectionPath = 'inquiries';
  const newDocRef = doc(collection(db, collectionPath));
  try {
    const payload = {
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      service: data.service,
      message: data.message.trim(),
      status: 'pending' as const,
      createdAt: data.createdAt || new Date().toISOString(),
      ...(data.userId ? { userId: data.userId } : {}),
      ...(data.userEmail ? { userEmail: data.userEmail } : {}),
    };
    await setDoc(newDocRef, payload);
    return newDocRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${collectionPath}/${newDocRef.id}`);
  }
}

// 2. Submit Consultation Booking to Firestore
export async function createConsultation(data: Omit<ConsultationRecord, 'id'>): Promise<string> {
  const collectionPath = 'consultations';
  const newDocRef = doc(collection(db, collectionPath));
  try {
    const payload = {
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      preferredTopic: data.preferredTopic,
      preferredDate: data.preferredDate || 'Earliest Available',
      notes: data.notes || '',
      status: 'scheduled' as const,
      createdAt: data.createdAt || new Date().toISOString(),
      ...(data.userId ? { userId: data.userId } : {}),
    };
    await setDoc(newDocRef, payload);
    return newDocRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${collectionPath}/${newDocRef.id}`);
  }
}

// 3. Realtime Inquiries Listener (For Admin or User)
export function subscribeToInquiries(
  userId: string | null,
  isAdmin: boolean,
  onData: (inquiries: InquiryRecord[]) => void,
  onError?: (err: Error) => void
) {
  const collectionPath = 'inquiries';
  let q = query(collection(db, collectionPath));

  if (!isAdmin && userId) {
    q = query(collection(db, collectionPath), where('userId', '==', userId));
  }

  return onSnapshot(
    q,
    (snapshot) => {
      const items: InquiryRecord[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<InquiryRecord, 'id'>),
      }));
      // Client-side sorting (newest first)
      items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      onData(items);
    },
    (error) => {
      console.error('Subscription error on inquiries:', error);
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.LIST, collectionPath);
    }
  );
}

// 4. Update Inquiry Status (Admin only)
export async function updateInquiryStatus(
  inquiryId: string,
  status: InquiryRecord['status']
): Promise<void> {
  const path = `inquiries/${inquiryId}`;
  try {
    await updateDoc(doc(db, 'inquiries', inquiryId), { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

// 5. Delete Inquiry (Admin only)
export async function deleteInquiryRecord(inquiryId: string): Promise<void> {
  const path = `inquiries/${inquiryId}`;
  try {
    await deleteDoc(doc(db, 'inquiries', inquiryId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
