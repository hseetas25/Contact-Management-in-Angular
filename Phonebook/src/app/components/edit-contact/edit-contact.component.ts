import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service'

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  editContact: FormGroup;
  isFormSubmitted: boolean;
  contact: Contact;
  id: number;
  validationMessages = {
    contactName: [
      { type: 'required', message: 'Contact Name is required.' }
    ],
    contactNumber: [
      { type: 'required', message: 'Contact Number is required.' }
    ]
  };
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private contactService: ContactService
  ) {
    this.isFormSubmitted = false;
  }

  ngOnInit(): void {
    this.id = +localStorage.getItem("id");
    this.contactService.getContact(this.id).subscribe((data)=>{
      const contact: Contact = JSON.parse(JSON.stringify(data)) as Contact;
      this.contact = contact;
      this.initializeForm();
    });
    
  }

  initializeForm(): void {
    this.editContact = this.formBuilder.group({
      contactName: new FormControl(
        this.contact.contactName, [Validators.required]
      ),
      contactNumber: new FormControl(
        this.contact.contactNumber, [Validators.required]
      )
    });
  }

  updateContactData(): void {
    this.isFormSubmitted = true;
    if (this.editContact.valid) {
      const contact: Contact = JSON.parse(JSON.stringify(this.editContact.value)) as Contact;
      this.contactService.updateContact(this.id, contact).subscribe((res)=>{
        this.toastrService.success("Edited", "Successfully");
        localStorage.setItem("id", "-1")
        window.location.reload();
      });
    }
  }

  resetForm(): void {
    this.editContact.reset();
  }

}
