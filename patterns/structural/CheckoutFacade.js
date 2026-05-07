import { InventoryService } from '../../services/InventoryService.js';
import { PaymentService } from '../../services/PaymentService.js';
import { ShippingService } from '../../services/ShippingService.js';

class CheckoutFacade {
    constructor() {
        this.inventoryService = new InventoryService();
        this.paymentService = new PaymentService();
        this.shippingService = new ShippingService();
    }

    placeOrder(orderDetails) {
        // TODO: Implement the Facade method.
        // This method should orchestrate the calls to the subsystem services
        // in the correct order to simplify the checkout process.
        // 1. Check if all products are in stock using `inventoryService.checkStock()`.
        // 2. If they are, process the payment using `paymentService.processPayment()`.
        // 3. If payment is successful, arrange shipping using `shippingService.arrangeShipping()`.
        // 4. Log the result of each step. If a step fails, log it and stop.

        console.log("1. Checking inventory...");
       
        const isStockAvailable = this.inventoryService.checkStock(orderDetails.productIds);
        
        
        if (!isStockAvailable) {
            console.log("-> Order failed: Products are out of stock.");
            return; 
        }

        console.log("2. Processing payment...");
        const isPaymentSuccessful = this.paymentService.processPayment(orderDetails.userId, 150);
        
        if (!isPaymentSuccessful) {
            console.log("-> Order failed: Payment processing error.");
            return; 
        }

        console.log("3. Arranging shipping...");
        this.shippingService.arrangeShipping(orderDetails.userId, orderDetails.shippingInfo);

        console.log("-> Order placed successfully!");
    }
    
}

export { CheckoutFacade };
