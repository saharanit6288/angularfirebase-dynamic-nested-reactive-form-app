import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from '../../services/firebase.service'; 
import { ActivatedRoute, Router } from "@angular/router"; 
import { Location } from '@angular/common'; 
import { Customer, CustAddress } from '../../models/customer';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  public editForm: FormGroup;


  constructor(
    private _fb: FormBuilder,
    public firebaseApi: FirebaseService, 
    public toastr: ToastrService,
    private location: Location, 
    private actRoute: ActivatedRoute, 
    private router: Router) { }

    ngOnInit() {
      this.editForm = this._fb.group({
          name: ['', [Validators.required, Validators.minLength(5)]],
          email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
          contactno: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
      });
      const id = this.actRoute.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
      this.firebaseApi.Get(id).valueChanges().subscribe(data => {
        this.editForm.patchValue({
          name: data.name,
          email: data.email,
          contactno: data.contactno
        });
        this.editForm.setControl('addresses', this.setExistingAddresses(data.addresses));  
      })
    }

    // Go back to previous component
    goBack() {
      this.location.back();
    }

    setExistingAddresses(addresses: CustAddress[]) : FormArray {
      const formArray=new FormArray([]);
      addresses.forEach(s=>{
        formArray.push(this._fb.group({
          street:s.street,
          city:s.city,
          postcode:s.postcode
        }));
      });

      return formArray;
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
      const control = <FormArray>this.editForm.controls['addresses'];
      control.push(this.initAddress());
    }
  
    removeAddress(i: number) {
      // remove address from the list
      const control = <FormArray>this.editForm.controls['addresses'];
      control.removeAt(i);
    }

    update(){
      this.firebaseApi.Update(this.editForm.value);       // Update student data using CRUD API
      this.toastr.success('Data updated successfully', "Updated");   // Show succes message when data is successfully submited
      this.router.navigate(['view-customers']);               // Navigate to student's list page when student data is updated
    }

}
