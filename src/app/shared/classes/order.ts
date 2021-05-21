import { UserAds } from './UserAds';

// Order
export interface Order {
    shippingDetails?: any;
    product?: UserAds;
    orderId?: any;
    totalAmount?: any;
}