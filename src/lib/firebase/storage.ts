import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/lib/firebase/clientApp";

export async function uploadFile(filePath: string, file: File): Promise<string> {
  try {
    if (!filePath) {
      throw new Error("No file path has been provided.");
    }

    if (!file || !file.name) {
      throw new Error("A valid file has not been provided.");
    }

    const storageRef = ref(storage, filePath);
    await uploadBytesResumable(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

export async function uploadImage(folder: string, file: File, fileName?: string): Promise<string> {
  try {
    const actualFileName = fileName || file.name;
    const filePath = `images/${folder}/${actualFileName}`;
    return await uploadFile(filePath, file);
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

export async function deleteFile(filePath: string): Promise<void> {
  try {
    const storageRef = ref(storage, filePath);
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
}

export async function uploadUserProfileImage(userId: string, file: File): Promise<string> {
  return uploadImage(`users/${userId}/profile`, file, `profile.${file.name.split('.').pop()}`);
}

export async function uploadChatImage(chatId: string, file: File): Promise<string> {
  const timestamp = Date.now();
  return uploadImage(`chats/${chatId}`, file, `${timestamp}_${file.name}`);
}