import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'my-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() user;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    
  }

  logOut(){
    this.auth.logoutUser()
  }

}
