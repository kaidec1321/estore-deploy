import { Order } from './order';
export class Promotion {
    id: string = '';
    loyalPoint: number = 0;
    discount: number = 0;
    maxDiscount: number = 0;
    minAcceptOrderPrice: number = 0;
    endDate: Date = new Date();
    startDate: Date = new Date();
    quantity: number = 1;
    idDeleted: boolean = false;
    createdAt: Date = new Date();
    orders: Order[] = [];
}