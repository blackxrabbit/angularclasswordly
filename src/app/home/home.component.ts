import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  message = new FormControl(null,Validators.required);
  post = []

  constructor(
    private msg: MessageService
  ) { }

  ngOnInit() {

    this.message.valueChanges
    .pipe(
      filter(val => val ? val : '')
      ,
      debounceTime(300)
      ,
      distinctUntilChanged()
      )
    .subscribe((val:string) => {
      this.message.setValue(val.substr(0,180))
    })

    this.msg.getAllPost().subscribe((post: any[]) => {
      console.log(post);
      this.post = post.sort((a,b) => b.createdDate.seconds - a.createdDate.seconds);
    })

  }


  postMessage(){
    this.msg.postMessage(this.message.value).then(() => {
      this.message.reset();
      
    })
  }

}
