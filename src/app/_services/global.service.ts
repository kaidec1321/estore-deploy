import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { environment } from '../../environments/environment';
import { Book } from '../_models/book';
import { CategoryResponse } from '../_models/cat-res';
import { GlobalInfo } from '../_models/info';
import { Cart } from '../_models/cart';

@Injectable({ providedIn: 'root' })
export class GlobalService {
    globalInfo: GlobalInfo = new GlobalInfo();

    private announceLoadingSource = new Subject<boolean>();

    loadingAnnounce$ = this.announceLoadingSource.asObservable();

    constructor(private http: HttpClient) {
    }

    getGlobalInfo() {
        return this.http.get<any>(`${environment.api}/customer/me`).subscribe(data => {
            this.globalInfo = data;
            console.log(data);
            console.log(this.globalInfo);
        });
    }

    getCartId() {
        return this.globalInfo.cart.id;
    }

    announceLoading(state: boolean) {
        this.announceLoadingSource.next(state);
    }

    getBookList(): Observable<Book[]> {
        return this.http.get<any>(`${environment.api}/book/list`);
    }

    getBook(id): Observable<Book[]> {
        return this.http.get<any>(`${environment.api}/book/${id}`);
    }

    addBook(book): Observable<boolean> {
        return this.http.post<any>(`${environment.api}/category`, book);
    }

    getAllCategory(): Observable<CategoryResponse> {
        return this.http.get<any>(`${environment.api}/category`);
    } 

    getWithParams(parameters) {

        // Initialize Params Object
        let params = new HttpParams();
    
        // Begin assigning parameters
        params = params.append('firstParameter', parameters.valueOne);
        params = params.append('secondParameter', parameters.valueTwo);
    
        // Make the API call using the new parameters.
        return this.http.get(`${environment.api}/api/v1/data/logs`, { params: params })
    }

    addToCart(bookId, quantity): Observable<boolean> {
        return this.http.post<any>(`${environment.api}/cart-book/update-cart`, {bookId, quantity});
    }

    getCart(id): Observable<Cart> {
        return this.http.get<any>(`${environment.api}/cart/${id}`);
    }
}