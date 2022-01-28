import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private toasterService : ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.toasterService.success("Bizimle iletişim kurduğunuz için teşekürler. En kısa zamanda sizinle irtibata geçecez.","Teşekkürler")
  }
}
