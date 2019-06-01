import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-authenticatepage',
  templateUrl: './authenticatepage.component.html',
  styleUrls: ['./authenticatepage.component.scss']
})
export class AuthenticatepageComponent implements OnInit {

  authForm: FormGroup;
  signUp = false;
  

  constructor(
    private snack: MatSnackBar,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

  loginUser(){
    let data = this.authForm.getRawValue();
    this.auth.loginUser(data.email, data.password)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      this.snack.open(error.message, 'close', {duration: 3000})
    })
  }

  doneCreatingUser(done){
    if(done){
      this.signUp = false;
      // this.snack.open('Successfully created new user', 'close');
    }
  }

}
