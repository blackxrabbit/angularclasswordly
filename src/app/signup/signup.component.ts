import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import {pipe} from 'rxjs';
import {debounceTime} from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @Output()
  doneSignUp = new EventEmitter<boolean>();
  
  authForm: FormGroup;

  constructor(
    private auth: AuthService,
    private snack: MatSnackBar
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      username: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      retypePassword: new FormControl(null, [Validators.required])
    });

    this.retypePWControl
    .valueChanges
    .pipe(debounceTime(300))
    .subscribe(value => {
      let pw = this.authForm.get('password').value;
      this.setError(value, pw)
    })

    this.pwControl
    .valueChanges
    .pipe(debounceTime(300))
    .subscribe(pw => {
      let value = this.retypePWControl.value;
      this.setError(value, pw)
    })
    
  }

  setError(retype, pw){
    if(retype === pw){
      this.retypePWControl.setErrors(null)
    }else {
      // 
      this.retypePWControl.setErrors({'notthesame': 'The password is not the same'})
    }

  }

  get pwControl(){
    return this.authForm.get('password')
  }

  get retypePWControl(){
    return this.authForm.get('retypePassword')
  }

  get emailControl(){
    return this.authForm.get('email')
  }

  get usernameControl(){
    return this.authForm.get('username')
  }

  signUp(){
    let data = this.authForm.getRawValue();
    this.auth.signUp(data.email, data.password)
    .then(response => {
      
      return this.auth.createUser(response.user.uid, {
        email: data.email,
        username: data.username,
        uid: response.user.uid
      })
    })
    .then(val => {
      console.log(val)
      this.snack.open('Successfully created new user', 'close')
      .onAction()
      .subscribe(val => {
        this.doneSignUp.next(true)
      })
      
    })
    .catch(error => {
      this.snack.open(error.message, 'close')
      console.log(error)
    })
  }


}
