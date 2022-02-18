import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Contact } from '../models/contact.model'

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private baseUrl = 'http://localhost:3000/contacts';
  constructor(
    private httpClient: HttpClient
  ) { }

  getContacts(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(`${this.baseUrl}`);
  }

  addNewContact(contact: Contact): Observable<object> {
    return this.httpClient.post(`${this.baseUrl}`, contact);
  }

  updateContact(id: number, product: Contact): Observable<object> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, product);
  }

  getContact(id: number): Observable<object> {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  deleteContact(id: number): Observable<object> {
    return this.httpClient.delete<Contact>(`${this.baseUrl}/${id}`);
  }

}