export class ProductDetailsModel {
    name: string;
    price: number;
    // price: {
    //     regularPrice: number
    //     discountedPrice: number 
    // }

    toString() {
        return JSON.stringify(this, null, 2)
    }
}