import { Book } from './book';
export class OrderBook {
    quantity: number = 1;
    bookId: string = '';
    book: Book = new Book();
}