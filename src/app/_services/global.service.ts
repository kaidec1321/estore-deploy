import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { environment } from '../../environments/environment';
import { Book } from '../_models/book';
import { CategoryResponse } from '../_models/cat-res';
import { GlobalInfo } from '../_models/info';
import { Cart } from '../_models/cart';
import { Category } from '../_models/category';

@Injectable({ providedIn: 'root' })
export class GlobalService {

    private announceLoadingSource = new Subject<boolean>();
    private announceAdminUI = new Subject<boolean>();

    loadingAnnounce$ = this.announceLoadingSource.asObservable();
    adminAnnounce$ = this.announceAdminUI.asObservable();

    constructor(private http: HttpClient) {
    }

    getGlobalInfo() {
        return this.http.get<any>(`${environment.api}/customer/me`);
    }

    announceLoading(state: boolean) {
        this.announceLoadingSource.next(state);
    }

    announceAdmin(state: boolean = true) {
        this.announceAdminUI.next(state);
    }

    getBookList(): Observable<Book[]> {
        return this.http.get<any>(`${environment.api}/book`);
    }

    getBook(id): Observable<Book[]> {
        return this.http.get<any>(`${environment.api}/book/${id}`);
    }

    addBook(book): Observable<boolean> {
        return this.http.post<any>(`${environment.api}/book`, book);
    }

    editBook(id, title, author, noPage, size, pricePerUnit,
        discount, categoryId, categoryName, publisher, publicationDate,
        description, isbn): Observable<any> {
        return this.http.put<any>(`${environment.api}/book/${id}`, {title, author, noPage, size, pricePerUnit,
            discount, categoryId, categoryName, publisher, publicationDate,
            description, isbn})
    }

    deleteBook(id): Observable<any> {
        return this.http.put<any>(`${environment.api}/book/delete/${id}`, {})
    }

    getAllCategory(): Observable<Category[]> {
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
        return this.http.get<any>(`${environment.api}/cart/`);
    }

    addCategory(name, description): Observable<any> {
        return this.http.post<any>(`${environment.api}/category`, {name, description})
    }

    editCategory(id, name, description): Observable<any> {
        return this.http.put<any>(`${environment.api}/category/${id}`, {name, description})
    }

    deleteCategory(id): Observable<any> {
        return this.http.delete<any>(`${environment.api}/category/${id}`);
    }

    getAllOrder(): Observable<any> {
        return this.http.get<any>(`${environment.api}/order`);
    }

    createOrder(tax, shippingPrice, address): Observable<any> {
        return this.http.post<any>(`${environment.api}/order`, {tax, shippingPrice, address});
    }

    updateOrder(id, status): Observable<any> {
        return this.http.put<any>(`${environment.api}/order/${id}`, {status});
    }

    getAllPromotion(): Observable<any> {
        return this.http.get<any>(`${environment.api}/promotion`);
    }

    createPromotion(loyalPoint, discount, maxDiscountPrice, minAcceptOrderPrice, endDate, startDate): Observable<any> {
        return this.http.post<any>(`${environment.api}/promotion`, {loyalPoint, discount, maxDiscountPrice, minAcceptOrderPrice, endDate, startDate});
    }

    updatePromotion(id, loyalPoint, discount, maxDiscountPrice, minAcceptOrderPrice, endDate, startDate): Observable<any> {
        return this.http.put<any>(`${environment.api}/promotion/${id}`, {loyalPoint, discount, maxDiscountPrice, minAcceptOrderPrice, endDate, startDate});
    }

    deletePromotion(id): Observable<any> {
        return this.http.put<any>(`${environment.api}/promotion/${id}`, {isDeleted: true});
    }

    getAllCustomer(): Observable<any> {
        return this.http.get<any>(`${environment.api}/customer`);
    }

    deleteCustomer(id): Observable<any> {
        return this.http.put<any>(`${environment.api}/customer/delete/${id}`, {});
    }

    getMyOrder(): Observable<any> {
        return this.http.get<any>(`${environment.api}/order/my-list`);
    }

    getOrder(id): Observable<any> {
        return this.http.get<any>(`${environment.api}/order/${id}`);
    }
}