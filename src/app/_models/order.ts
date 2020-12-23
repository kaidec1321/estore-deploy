import { Customer } from "./customer";
import { OrderBook } from './order-book';
import { Promotion } from './promotion'

export class Order {
    id: string = '';
    totalQuantity: number = 0;
    totalBookPrice: number = 0;
    tax: number = 0;
    shippingPrice: number = 0;
    createdAt: Date = new Date();
    address:  string;
    customer: Customer = new Customer();
    promotion: Promotion = new Promotion();
    orderBooks: OrderBook[] = [];
    status: string = 'new';
}