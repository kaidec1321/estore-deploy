import { Cart } from "./cart";
import { Order } from "./order";

export class GlobalInfo {
    id: string = '';
    email: string = '';
    password: string = '';
    fullname: string = '';
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
}