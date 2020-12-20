import { from } from "rxjs";
import { Review } from "./review";
import { Image } from "./image"

export class Book {
    id: string;
    title: string;
    author: string;
    rate: number;
    countRate: number;
    publicationDate: Date;
    pricePerUnit: number;
    quantity: number;
    discount: number;
    createdAt: Date;
    description: string;
    reviews: Review[];
    bookImages: Image[];
}