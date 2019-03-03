import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Firebase Modules
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

// Import below modules for NGX Toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// Reactive Form Module
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerAddressComponent } from './components/customer-address/customer-address.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';


@NgModule({
  declarations: [
    AppComponent,
    AddCustomerComponent,
    DashboardComponent,
    CustomerListComponent,
    CustomerAddressComponent,
    EditCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Main Angular fire module 
    AngularFireDatabaseModule,  // Firebase database module 
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-center'
    }), // ToastrModule added
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
