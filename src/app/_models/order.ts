import { GlobalInfo } from "./info";
import { OrderBook } from './order-book';
import { Promotion } from './promotion'

export class Order {
    id: string = '';
    totalQuantity: number = 0;
    totalBookPrice: number = 0;
    tax: number = 0;
    shippingPrice: number = 0;
    createdAt: Date = new Date();
    address:  string = 'BKU';
    customer: GlobalInfo = new GlobalInfo();
    promotion: Promotion = new Promotion();
    orderBooks: OrderBook[] = [];
}