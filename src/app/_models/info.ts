import { Cart } from "./cart";
import { Order } from "./order";
import { Review } from "./review";

export class GlobalInfo {
    id: string = '';
    email: string = '';
    password: string = '';
    fullName: string = '';
    loyalPoint: number = 0;
    birthday: Date = new Date();
    phone: string = '0000000000';
    address: string = 'BKU';
    city: string = 'HCM';
    country: string = 'VN';
    inactive: boolean = false;
    createdAt: Date = new Date();
    cart: Cart;
    orders: Order[];
    reviews: Review[];
}