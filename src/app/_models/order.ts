import { Customer } from "./customer";
import { OrderBook } from './order-book';
import { Promotion } from './promotion'

export class Order {
    id: string = '';
    customerId: string = '';
    totalQuantity: number = 0;
    totalBookPrice: number = 0;
    discountMoney: number = 0;
    tax: number = 0;
    shippingPrice: number = 0;
    createdAt: Date = new Date();
    address:  string;
    customer: Customer = new Customer();
    promotion: Promotion;
    orderBooks: OrderBook[] = [];
    status: string = 'new';
    total: number = 0;
}