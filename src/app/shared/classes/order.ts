import { Product } from './UserAds';

// Order
export interface Order {
    shippingDetails?: any;
    product?: Product;
    orderId?: any;
    totalAmount?: any;
}