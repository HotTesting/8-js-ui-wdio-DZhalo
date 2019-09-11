import { App } from '../../pageObjects/application';
import { expect } from 'chai'

/**
 - verify prices in cart, and after order created
 - verify order is successful
 - Prefer css selectors 
 - Try to implement as much tests as you can
 - Do not overload tests with logic, be simple
 - You SHOULD use PageObjects for this tests
 - Use mocha before/after hooks to reuse pre/post conditions
 - Use ChaiJS (expect, should or assert style) to make assertions
 */

// Each implemented test gives you 15 points
describe("Order", function() {
    it("is successful for regular item", function() {
        // http://ip-5236.sunline.net.ua:38015/rubber-ducks-c-1/red-duck-p-3
        // Just regular duck without discounts, parameters, or sold our
        App.product.open('/rubber-ducks-c-1/red-duck-p-3')
        const productDetails = App.product.getProductDetails()       

        App.product.addToCart()

        App.checkout.open()
        expect(App.checkout.isItemsInCart()).to.be.true

        const productNameInCart = App.checkout.shoppingCart.items[0].getProductName()
        const productPriceInCart = App.checkout.shoppingCart.items[0].getProductPrice()

        expect(productPriceInCart).to.equal(productDetails.price)

        App.checkout.customerDetails.fillInForm();
        
        App.checkout.customerDetails.saveCustomerDetails()
        App.checkout.confirmOrder()

        const orderResultProduct = $('#box-order-success .item').getAttribute('data-name')
        expect(orderResultProduct).to.equal(productNameInCart)

    });

    it("is successful for discounted item", function() {
        // http://ip-5236.sunline.net.ua:38015/rubber-ducks-c-1/blue-duck-p-4 
        // this duck always has discount 20%
        App.product.open('/rubber-ducks-c-1/blue-duck-p-4')
        const productDetails = App.product.getProductDetails()       

        App.product.addToCart()

        App.checkout.open()
        expect(App.checkout.isItemsInCart()).to.be.true

        const productNameInCart = App.checkout.shoppingCart.items[0].getProductName()
        const orderSum = App.checkout.getSum()

        expect(orderSum).to.equal(productDetails.price)

        App.checkout.customerDetails.fillInForm();
        
        App.checkout.customerDetails.saveCustomerDetails()
        App.checkout.confirmOrder()

        const orderResultProduct = $('#box-order-success .item').getAttribute('data-name')
        expect(orderResultProduct).to.equal(productNameInCart)
    });

    it("is successful for sold out item", function() {
        // http://ip-5236.sunline.net.ua:38015/rubber-ducks-c-1/purple-duck-p-5 
        // this duck always sold out
        App.product.open('/rubber-ducks-c-1/purple-duck-p-5 ')
        const productDetails = App.product.getProductDetails()       

        App.product.addToCart()

        App.checkout.open()
        expect(App.checkout.isItemsInCart()).to.be.true

        const productNameInCart = App.checkout.shoppingCart.items[0].getProductName()
        const orderSum = App.checkout.getSum()

        expect(orderSum).to.equal(productDetails.price)

        App.checkout.customerDetails.fillInForm();
        
        App.checkout.customerDetails.saveCustomerDetails()
        App.checkout.confirmOrder()

        const orderResultProduct = $('#box-order-success .item').getAttribute('data-name')
        expect(orderResultProduct).to.equal(productNameInCart)
    });

    it("is successful for 2 same items in card", function() {
        // http://ip-5236.sunline.net.ua:38015/rubber-ducks-c-1/red-duck-p-3
        // Just regular duck without discounts, parameters, or sold our
        App.product.open('/rubber-ducks-c-1/red-duck-p-3')
        const productDetails = App.product.getProductDetails()   
        
        App.product.setProductQuantity(2)
        App.product.addToCart()

        App.checkout.open()
        expect(App.checkout.isItemsInCart()).to.be.true

        const productPriceInCart = App.checkout.shoppingCart.items[0].getProductPrice()
        const productQuantityInCart = App.checkout.shoppingCart.items[0].getProductQuantity()
        const orderSum = App.checkout.getSum()

        console.log('$$$', orderSum)

        expect(orderSum).to.equal(productPriceInCart*productQuantityInCart)

        App.checkout.customerDetails.fillInForm();
        
        App.checkout.customerDetails.saveCustomerDetails()
        App.checkout.confirmOrder()

        const orderResultQuantity = parseFloat($('#box-order-success .item').getAttribute('data-quantity'))
        expect(orderResultQuantity).to.equal(productQuantityInCart)
    });

    it.only("is successful for 2 different items in card", function() {
        App.product.open('/rubber-ducks-c-1/red-duck-p-3') 
        App.product.addToCart()

        App.product.open('/rubber-ducks-c-1/blue-duck-p-4')
        App.product.addToCart()

        App.checkout.open()
        expect(App.checkout.isItemsInCart()).to.be.true

        const productNameInCart1 = App.checkout.shoppingCart.items[0].getProductName()
        const productPriceInCart1 = App.checkout.shoppingCart.items[0].getProductPrice()
        const productNameInCart2 = App.checkout.shoppingCart.items[1].getProductName()
        const productPriceInCart2 = App.checkout.shoppingCart.items[1].getProductPrice()
        const orderSum = App.checkout.getSum()

        expect(orderSum).to.equal(productPriceInCart1+productPriceInCart2)

        App.checkout.customerDetails.fillInForm();

        App.checkout.customerDetails.saveCustomerDetails()
        App.checkout.confirmOrder()

        const orderResultProduct = $('#box-order-success .items').getText()
        expect(orderResultProduct).to.include(productNameInCart1).and.to.include(productNameInCart2)


    });

    it("is successful for items with parameters", function() {
        // http://ip-5236.sunline.net.ua:38015/rubber-ducks-c-1/premium-ducks-c-2/vip-yellow-duck-p-6 
        // this duck has 3 sizes - small, medium, large. Each size has own price. Verify that price calculated correctly
        App.product.open('/rubber-ducks-c-1/premium-ducks-c-2/vip-yellow-duck-p-6')
        const productDetails = App.product.getProductDetails()   
         
        App.product.setProductSize('Small')
        App.product.addToCart()
 
        App.checkout.open()
        expect(App.checkout.isItemsInCart()).to.be.true
 
        const productNameInCart = App.checkout.shoppingCart.items[0].getProductName()
        const productSizeInCart = App.checkout.shoppingCart.items[0].getProductSize()
        const orderSum = App.checkout.getSum()
 
 
        expect(orderSum).to.equal(productDetails.price)
        expect(productSizeInCart).to.include('Small')
 
        App.checkout.customerDetails.fillInForm();
         
        App.checkout.customerDetails.saveCustomerDetails()
        App.checkout.confirmOrder()
 
        const orderResultProduct = $('#box-order-success .item').getAttribute('data-name')
        expect(orderResultProduct).to.equal(productNameInCart)
    });
});