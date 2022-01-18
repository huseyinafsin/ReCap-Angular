import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MailSubscribe } from 'src/app/models/mailSubscribe';
import {MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isSubscribed:boolean=false
  constructor(private mailService:MailService) { }

  ngOnInit(): void {

  }


  onSubscribe(email:string){
    let mailSubscribe:MailSubscribe = {id:undefined, email:email}
    this.mailService.add(mailSubscribe).subscribe(response =>{
      this.isSubscribed = response.success;
    })
  }
}
