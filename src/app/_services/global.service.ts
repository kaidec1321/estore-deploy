import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Book } from '../_models/book';
import { CategoryResponse } from '../_models/cat-res';

@Injectable({ providedIn: 'root' })
export class GlobalService {
    constructor(private http: HttpClient) {
    }

    getBookList(): Observable<Book[]> {
        return this.http.get<any>(`${environment.api}/book/list`);
    }

    getBook(id): Observable<Book> {
        return this.http.get<any>(`${environment.api}/book/${id}`);
    }

    getAllCategory(): Observable<CategoryResponse> {
        return this.http.get<any>(`${environment.api}/category`);
    } 
}