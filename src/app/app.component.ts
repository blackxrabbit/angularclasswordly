import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wordly';
  user;

  constructor(
    private snack: MatSnackBar,
    private auth: AuthService){

  }

  ngOnInit(){
    this.auth.user
    .subscribe(user =>{
      this.user = user;
      if(user){
        this.snack.open(`Welcome back ${user.username}`, 'close', {duration: 3000})
      }
    })
  }
}
