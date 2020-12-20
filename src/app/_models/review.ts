import { Customer } from "./customer";

export class Review {
    id: string;
    bookId: string;
    customerId: string;
    rate: number;
    content: string;
    createdAt: Date;
    customer: Customer;
}