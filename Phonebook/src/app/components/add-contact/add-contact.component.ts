import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service'

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  addNewContact: FormGroup;
  isFormSubmitted: boolean;
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
    this.initializeForm();
  }

  initializeForm(): void {
    this.addNewContact = this.formBuilder.group({
      contactName: new FormControl(
        '', [Validators.required]
      ),
      contactNumber: new FormControl(
        '', [Validators.required]
      )
    });
  }

  addNewContactData(): void {
    this.isFormSubmitted = true;
    if (this.addNewContact.valid) {
      const contact: Contact = JSON.parse(JSON.stringify(this.addNewContact.value)) as Contact;
      this.contactService.addNewContact(contact).subscribe((res)=>{
        this.toastrService.success("Added", "Successfully");
        localStorage.setItem("id", "-1")
        window.location.reload();
      });
    }
  }

  resetForm(): void {
    this.addNewContact.reset();
  }

}
