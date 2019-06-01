import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<any>;
  

  constructor(
    private auth: AngularFireAuth,
    private fs: AngularFirestore
  ) {
    this.authenticateUser();
  }

  authenticateUser() {
    this.user = this.auth.authState
    .pipe(switchMap(user => {
        if(!user){
          return of(null)
        }

        return this.fs.collection('users').doc(user.uid).valueChanges()
    }))
    
   }

  loginUser(email, password) { 
    return this.auth.auth.signInWithEmailAndPassword(email, password)
  }

  logoutUser() {
    this.auth.auth.signOut()
   }

  signUp(email, password){
    return this.auth.auth.createUserWithEmailAndPassword(email, password)
  }

  createUser(uid, user){
    return this.fs.collection('users').doc(uid).set(user)
  }


}
