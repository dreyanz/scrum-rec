import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { UpdateData, User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  constructor(private afStore: AngularFirestore) { }

  saveData(user : User, updateData : UpdateData) {
    
    const userRef: AngularFirestoreDocument <any> = this.afStore.doc(`users/${user.uid}`)
    .collection("updates").doc(updateData.date);

    return userRef.set(updateData, {
      merge: true
    });
  }

}
