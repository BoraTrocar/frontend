// firebase-storage.service.ts
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirebaseStorageService {
  private storage;

  constructor() {
    const app = initializeApp(environment.firebase);
    this.storage = getStorage(app);
  }

  async uploadImage(file: File): Promise<string> {
    const filePath = `images/${new Date().getTime()}_${file.name}`;
    const fileRef = ref(this.storage, filePath);

    try {
      await uploadBytes(fileRef, file);
      return await getDownloadURL(fileRef);
    } catch (error) {
      console.error('Error uploading image: ', error);
      throw error;
    }
  }
}
