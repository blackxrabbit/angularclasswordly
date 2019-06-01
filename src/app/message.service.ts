import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  user;

  constructor(
    private af: AngularFirestore,
    private auth: AuthService
  ) { 
    this.auth.user.subscribe(user => {
      this.user = user;
    })
  }


  postMessage(message){
    return this.af.collection('messages').add({
      message: message,
      username: this.user.username,
      uid: this.user.uid,
      createdDate: new Date()
    })
  }

  getAllPost(){
    return this.af.collection('messages').valueChanges()
  }
}
