import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MessageService } from '../message.service';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.scss']
})
export class AddpostComponent implements OnInit {

  message = new FormControl(null,Validators.required)

  constructor(
    private msg: MessageService
  ) { }

  ngOnInit() {

    this.message.valueChanges
    .pipe(filter(val => val ? val : ''),debounceTime(300), distinctUntilChanged())
    .subscribe((val:string) => {
      this.message.setValue(val.substr(0,180))
    })
  }


  postMessage(){
    this.msg.postMessage(this.message.value).then(() => {
      this.message.reset();
    })
  }

}
