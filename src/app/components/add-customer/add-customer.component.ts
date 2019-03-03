import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from '../../services/firebase.service'; 

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  public myForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    public firebaseApi: FirebaseService, 
    public toastr: ToastrService) { }

  ngOnInit() {
    this.myForm = this._fb.group({
        name: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
        contactno: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        addresses: this._fb.array([
            this.initAddress(),
        ])
    });
  }

  initAddress() {
      // initialize our address
      return this._fb.group({
          street: ['', Validators.required],
          city: ['', Validators.required],
          postcode: ['']
      });
  }

  addAddress() {
    // add address to the list
    const control = <FormArray>this.myForm.controls['addresses'];
    control.push(this.initAddress());
  }

  removeAddress(i: number) {
    // remove address from the list
    const control = <FormArray>this.myForm.controls['addresses'];
    control.removeAt(i);
  }

  save() {
    console.log(this.myForm.value);
    // call API to save customer
    this.firebaseApi.Add(this.myForm.value); 
    this.toastr.success('Data successfully added!',"Created"); 
    this.ResetForm();
  }

  ResetForm() {
    this.myForm.reset();
  }  

}
