import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';  
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  customersRef: AngularFireList<any>;    
  customerRef: AngularFireObject<any>;   
  
  constructor(private db:AngularFireDatabase) { }

  // Create 
  Add(customer: Customer) {
    this.customersRef.push({
      name: customer.name,
      email: customer.email,
      contactno: customer.contactno,
      image: null,
      addresses: customer.addresses
    });
  }

  // Fetch Single Object
  Get(id: string) {
    this.customerRef = this.db.object('customer-list/' + id);
    return this.customerRef;
  }

  // Fetch List
  GetList() {
    this.customersRef = this.db.list('customer-list');
    return this.customersRef;
  }  

  // Update Object
  Update(customer: Customer) {
    this.customerRef.update({
      name: customer.name,
      email: customer.email,
      contactno: customer.contactno,
      image: null,
      addresses: customer.addresses
    })
  }  

  // Delete Object
  Delete(id: string) { 
    this.customerRef = this.db.object('customer-list/'+id);
    this.customerRef.remove();
  }
}
