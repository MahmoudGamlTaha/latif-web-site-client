import { UserAds, users } from './UserAds';

// Order
export class Blog {
    id:number;
    title?: string;
    category?: string;
    categoryAr?:string;
    categoryId:number;
    description?: string;
    createdBy:users;
    CreatedAt:Date;
    image:string;
    images:[];
}