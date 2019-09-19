import { CustomerInfo } from "../dataModels/CustomerInfo";

export class Checkout {
    shoppingCart
    customerDetails

    constructor() {
        this.shoppingCart = new ShoppingCart()
        this.customerDetails = new CustomerDetails()
    }

    private get noItemsLabel() {
        return $('.cart.wrapper em')
    }

    open() {
        browser.url('/checkout')
        $('.loader-wrapper .loader').waitForDisplayed(null, true, `Expected loader to disappear`)
    }

    isNoItemsInCart() {
        if(this.noItemsLabel.isDisplayed()) {
            return this.noItemsLabel.getText()
                .includes('There are no items in your cart.')
        } else {
            return false
        }
    }

    isItemsInCart() {
        return !this.isNoItemsInCart()
    }

    getSum() {
        const sum = $('.formatted-value').getText()
        const clearSum = sum.replace('$','')
        return parseFloat(clearSum)
    }

    confirmOrder() {
        $('.loader-wrapper .loader').waitForDisplayed(null, true, `Expected loader to dispappear`);
        $('.confirm button[name="confirm_order"]').click()
        
    }
}

// Component
class ShoppingCart {
    private get container() {
        return $('#box-checkout-cart')
    }

    public get items() {
        return $$('table.items tr.item').map(item => {
            return new Item(item)
        })
    }

}

class Item {
    container

    constructor(itemContainer) {
        this.container = itemContainer
    }

    public getProductName() {
        return this.container.getAttribute('data-name')
    }

    public getProductPrice() {
        return parseFloat(this.container.getAttribute('data-price'))
    }
    
    public getProductQuantity() {
        return parseFloat(this.container.getAttribute('data-quantity'))
    }

    public getProductSize() {
        return this.container.$('.options').getText()
    }

}

class CustomerDetails {
    
    private get firstNameInput() {
        return $('input[name="firstname"]')
    }

    private get lastNameInput() {
        return $('input[name="lastname"]')
    }

    private get addressInput() {
        return $('input[name="address1"]')
    }

    private get postcodeInput() {
        return $('input[name="postcode"]')
    }

    private get emailInput() {
        return $('input[name="email"]')
    }

    private get phoneInput() {
        return $('.input-group input[name="phone"]')
    }

    private get cityInput() {
        return $('input[name="city"]')
    }

    private get countrySelect() {
        return $('.form-group select[name="country_code"]')
    }


    public setFirstName(name) {
        this.firstNameInput.click()
        this.firstNameInput.clearValue()
        this.firstNameInput.setValue(name)
    }

    public setLastName(lastname) {
        $('.loader-wrapper .loader').waitForDisplayed(null, true, `Expected loader to dispappear`);
        this.lastNameInput.click()
        this.lastNameInput.clearValue()
        this.lastNameInput.setValue(lastname)
    }

    public setAddress1(address1) {
        $('.loader-wrapper .loader').waitForDisplayed(null, true, `Expected loader to dispappear`);
        this.addressInput.click()
        this.addressInput.clearValue()
        this.addressInput.setValue(address1)
    }

    public setPostcode(code) {
        $('.loader-wrapper .loader').waitForDisplayed(null, true, `Expected loader to dispappear`);
        this.postcodeInput.click()
        this.postcodeInput.clearValue()
        this.postcodeInput.setValue(code)
    }

    public setCity(city) {
        $('.loader-wrapper .loader').waitForDisplayed(null, true, `Expected loader to dispappear`);
        this.cityInput.click()
        this.cityInput.clearValue()
        this.cityInput.setValue(city)
    }

    public setCountry(country) {
        $('.loader-wrapper .loader').waitForDisplayed(null, true, `Expected loader to dispappear`);
        this.countrySelect.selectByVisibleText(country)
    }

    public setEmail(email) {
        $('.loader-wrapper .loader').waitForDisplayed(null, true, `Expected loader to dispappear`);
        this.emailInput.click()
        this.emailInput.clearValue()
        this.emailInput.setValue(email)
    }

    public setPhone(phone) {
        $('.loader-wrapper .loader').waitForDisplayed(null, true, `Expected loader to dispappear`);
        this.phoneInput.click()
        this.phoneInput.clearValue()
        this.phoneInput.setValue(phone)
    }

    public saveCustomerDetails() {
        $('.loader-wrapper .loader').waitForDisplayed(null, true, `Expected loader to dispappear`);
        const saveButton = $('.customer button[name="save_customer_details"]')
        saveButton.waitForEnabled(null, null, 'Expected Save button to be active')
        saveButton.click()
    }


    public fillInForm(customerInfo: CustomerInfo) {
        this.setFirstName(customerInfo.firstName)
        this.setLastName(customerInfo.lastName)
        this.setAddress1(customerInfo.address1)
        this.setPostcode(customerInfo.postCode)
        this.setCity(customerInfo.city)
        this.setCountry(customerInfo.country)
        this.setEmail(customerInfo.email)
        this.setPhone(customerInfo.phone)
    }

}