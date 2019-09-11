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
        browser.pause(3000)
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
        $('.confirm button[name="confirm_order"]').click()
        browser.pause(2000)
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
        this.firstNameInput.setValue(name)
    }

    public setLastName(lastname) {
        this.lastNameInput.setValue(lastname)
    }

    public setAddress(address) {
        this.addressInput.setValue(address)
    }

    public setPostcode(code) {
        this.postcodeInput.setValue(code)
    }

    public setCity(city) {
        this.cityInput.setValue(city)
    }

    public setCountry(country) {
        this.countrySelect.selectByVisibleText(country)
    }

    public setEmail(email) {
        this.emailInput.click()
        this.emailInput.setValue(email)
    }

    public setPhone(phone) {
        this.phoneInput.setValue(phone)
    }

    public saveCustomerDetails() {
        $('.customer button[name="save_customer_details"]').click()
        browser.pause(3000)
    }


    public fillInForm() {
        this.setFirstName('Daria')
        this.setLastName('Test')
        this.setAddress('Street 1')
        this.setPostcode('32123')
        this.setCity('Kiev')
        this.setCountry('Ukraine')
        this.setEmail(`test${new Date().getTime() / 1000}@test.com`)
        this.setPhone('+380501112233')
    }
}