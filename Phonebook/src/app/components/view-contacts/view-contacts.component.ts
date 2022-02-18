import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-view-contacts',
  templateUrl: './view-contacts.component.html',
  styleUrls: ['./view-contacts.component.css']
})
export class ViewContactsComponent implements OnInit {

  contacts: Contact[];
  contactsAvailable: boolean;
  constructor(
    private contactService: ContactService,
    private router: Router,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getContacts();
  }

  private getContacts(): void {
    this.contactService.getContacts().subscribe((data) => {
      if (data && data.length) {
        this.contacts = data;
        this.contactsAvailable = true;
      }
      else {
        this.contactsAvailable = false;
      }
    });
  }

  updateContact(id: number): void {
    localStorage.setItem("id", id.toString());
    window.location.reload();
  }

  deleteContact(id: number): void {
    this.contactService.deleteContact(id).subscribe((data => {
      this.toastrService.success('Successfully', 'Deleted');
      window.location.reload();
      localStorage.setItem("id", "-1")
      this.getContacts();
    }));
  }

  deleteAllContacts(): void {
    this.contacts.forEach((contact)=>{
      this.contactService.deleteContact(contact.id).subscribe((res)=>{
        console.log(res);
      });
    });
    this.toastrService.success("Successfully", "Deleted");
    window.location.reload();
  }

}
