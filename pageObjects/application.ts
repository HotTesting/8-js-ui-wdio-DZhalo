import { ProductDetails } from './productDetails';
import { Checkout } from './checkout';


class Application {
    product = new ProductDetails()
    checkout = new Checkout()
}

export const App: Application = new Application()