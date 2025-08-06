import { IBasketItem } from "./Product";

export interface IOrder {
    id : number;
    userId : number;
    productsInTheCart : IBasketItem[];
    orderDate : Date;
    shippingAddress : string ;
    status : string;
}