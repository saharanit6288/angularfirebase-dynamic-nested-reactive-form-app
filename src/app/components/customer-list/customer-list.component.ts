import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';  
import { Customer } from '../../models/customer';   
import { ToastrService } from 'ngx-toastr';      // Alert message using NGX toastr

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})

export class CustomerListComponent implements OnInit {
  Customers: Customer[];                 // Save students data in Student's array.
  hideWhenNoData: boolean = false; // Hide students data table when no student.
  noData: boolean = false;            // Showing No Student Message, when no student in database.
  preLoader: boolean = true;          // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)
  

  constructor(
    public firebaseApi: FirebaseService, // Inject student CRUD services in constructor.
    public toastr: ToastrService // Toastr service for alert message
    ){ }


  ngOnInit() {
    this.dataState(); // Initialize list, when component is ready
    let s = this.firebaseApi.GetList(); 
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Customers = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.Customers.push(a as Customer);
      })
    })
  }

  // Using valueChanges() method to fetch simple list of data. It updates the state of hideWhenNoData, noData & preLoader variables when any changes occurs in student data list in real-time.
  dataState() {     
    this.firebaseApi.GetList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoData = false;
        this.noData = true;
      } else {
        this.hideWhenNoData = true;
        this.noData = false;
      }
    })
  }

  // Method to delete student object
  delete(customer) {
    if (window.confirm('Are sure you want to delete this data ?')) { 
      this.firebaseApi.Delete(customer.$key) 
      this.toastr.success('Data successfully deleted!'); 
    }
  }

}
