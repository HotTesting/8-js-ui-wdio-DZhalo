
import { ProductDetailsModel } from '../dataModels/ProductDetails';
// for example: http://ip-5236.sunline.net.ua:38015/rubber-ducks-c-1/blue-duck-p-4


export class ProductDetails {

    open(productPath) {
        browser.url(productPath)
    }

    addToCart() {
        $('button[name="add_cart_product"]').click()
        browser.pause(2000)
    }

    public getProductPrice() {
        return parseFloat($('#box-product')
            .getAttribute('data-price'))
    }

    public getProductName() {
        return $('h1.title').getText()
    }

    public getProductDetails() {
        const productDetails = new ProductDetailsModel()

        productDetails.name = this.getProductName()
        productDetails.price = this.getProductPrice()

        return productDetails
    }

    public setProductQuantity(num) {
        const quantityInput = $('input[name="quantity"]')
        quantityInput.click()
        quantityInput.clearValue()
        quantityInput.setValue(num)
    }

    public setProductSize(size) {
        const sizeSelect = $('select[name="options[Size]"]')
        sizeSelect.selectByVisibleText(size)
    }
}