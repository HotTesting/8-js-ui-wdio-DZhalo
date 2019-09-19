export class Header {

    get container() {
        return $('#header')
    }

    getQuantity(): number {
        let quantity = this.container.$('#cart .quantity').getText()
        return parseInt(quantity)
    }
}
