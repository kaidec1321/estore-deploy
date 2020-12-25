import { from } from "rxjs";
import { Review } from "./review";
import { Image } from "./image"

export class Book {
    id: string;
    title: string = '';
    author: string = '';
    categoryId: string = null;
    categoryName: string = null;
    publisher: string = null;
    noPage: number = 0;
    deleted: boolean = false;
    size: string = "10cm x 20cm";
    isbn: string = "0-306-40615-2";
    rate: number = 5;
    countRate: number = 5;
    publicationDate: Date = new Date();
    pricePerUnit: number = 10;
    quantity: number = 1;
    discount: number = 0;
    createdAt: Date = new Date();
    description: string = "This is a description.";
    reviews: Review[] = [];
    bookImages: Image[] = [new Image()];
}