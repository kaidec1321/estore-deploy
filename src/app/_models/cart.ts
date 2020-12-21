import { OrderBook } from './order-book'

export class Cart {
    id: string = '';
    totalQuantity: number = 0;
    totalBookPrice: number = 0;
    createdAt: Date = new Date(); 
    tax: number = 0;
    cartBooks: OrderBook[] = []; 
}