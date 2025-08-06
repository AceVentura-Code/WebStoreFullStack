export interface IProduct {
    id: number;
    name : string;
    price : number;
    rating : number;
    imageUrl : string;
    mediaType : string;
    description : string;
    tags : string[];
}

export interface IBasketItem{
    product: IProduct;
    amount: number;
}