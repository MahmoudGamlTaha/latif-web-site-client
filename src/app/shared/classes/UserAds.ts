// Products
export class UserAds {
    id?: number;
    name?: string;
    description?: string;
    type?: string;
    short_description?: string;
    collection?: any[];
    category?: string;
    price?: number;
    city?: boolean;
    discount?: number;
    stock?: number;
    new?: boolean;
    quantity?: number;
    createdBy?: users;
    extra?: extraInfo[];
    images?: Images[];
    category_id:number;
    categoryName:string;
    categoryNameAr:string;
    variants:Variants[];
    title:string;
    sale:boolean;
    image:string;
    CreatedDate:Date;
}

export interface Variants {
    variant_id?: number;
    id?: number;
    sku?: string;
    size?: string;
    color?: string;
    image_id?: number;
}
export interface users {
 id?:number;
 firstName:string;
 lastName:string;
 email:string;
 city:string;
 phone:string;
 avatar:string;
 adsCount:number
}

export interface extraInfo{
 code?: string;
name?: string;
name_ar:string;
value: string
}

export interface Images {
    image_id?: number;
    id?: number;
    alt?: string;
    src?: string;
    variant_id?: any[];
}