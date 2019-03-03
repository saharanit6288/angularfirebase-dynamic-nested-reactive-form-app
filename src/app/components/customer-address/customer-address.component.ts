import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-address',
  templateUrl: './customer-address.component.html',
  styleUrls: ['./customer-address.component.css']
})

export class CustomerAddressComponent {
  // we will pass in address from App component
  @Input('group')  public addressForm: FormGroup;
}
