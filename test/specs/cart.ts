import { App } from '../../pageObjects/application';
import { expect } from 'chai'


describe('Cart', function () {
    it('can add item', function () {        
        App.product.open('/rubber-ducks-c-1/red-duck-p-3')
        App.product.addToCart()

        App.checkout.open()
        expect(App.checkout.isItemsInCart()).to.be.true
    })

    it('can add correct item', function () {
        App.product.open('/rubber-ducks-c-1/red-duck-p-3')
        const productDetails = App.product.getProductDetails()
        
        console.log('$$$$productDetails', productDetails.toString())        

        App.product.addToCart()

        App.checkout.open()
        expect(App.checkout.isItemsInCart()).to.be.true

        const productNameInCart = App.checkout.shoppingCart.items[0].getProductName()
        const productPriceInCart = App.checkout.shoppingCart.items[0].getProductPrice()

        console.log('productNameInCart', productNameInCart)
        console.log('productPriceInCart', productPriceInCart)

        expect(productNameInCart).to.equal(productDetails.name)
        expect(productPriceInCart).to.equal(productDetails.price)
    })
})