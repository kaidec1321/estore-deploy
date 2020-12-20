import { Category } from "./category";

export class CategoryResponse {
    data: Category[];
    count: number;
    total: number;
    page: number;
    pageCount: number;
}