import { from } from "rxjs";
import { Review } from "./review";
import { Image } from "./image"

export class Book {
    id: string;
    title: string = "Undefine";
    author: string = "Undefine";
    rate: number = 5;
    countRate: number = 5;
    publicationDate: Date = new Date();
    pricePerUnit: number = 50000;
    quantity: number = 1;
    discount: number = 0;
    createdAt: Date = new Date();
    description: string = "This is a description.";
    reviews: Review[] = [];
    bookImages: Image[] = [];
}