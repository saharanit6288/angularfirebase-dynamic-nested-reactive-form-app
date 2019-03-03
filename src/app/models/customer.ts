export interface Customer {
    $key: string;
    name: string; // required field with minimum 5 characters
    email: string;
    contactno: string;
    image: any;
    addresses: CustAddress[]; // user can have one or more addresses
}

export interface CustAddress {
    $key: string;
    street: string;  // required field
    city: string;
    postcode: string;
}
