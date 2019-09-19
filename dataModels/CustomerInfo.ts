

export class CustomerInfo {
    company: string;
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    postCode: number;
    city: string;
    country: string;
    email: string;
    phone: string;

    constructor(data) {
        this.company = data.company;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.address1 = data.address1;
        this.address2 = data.address2;
        this.postCode = data.postCode;
        this.city = data.city;
        this.country = data.country;
        this.email = data.email;
        this.phone = data.phone;
    }   

    toString() {
        return JSON.stringify(this, null, 2)
    }
}