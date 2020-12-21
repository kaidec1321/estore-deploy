import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string, isAdmin: boolean) {
        var url = isAdmin ? `${environment.api}/admin/signin` : `${environment.api}/customer/login`;
        return this.http.post<any>(url, { email, password })
            .pipe(map(data => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                let user = new User();
                user.token = data.token;
                user.email = email;
                user.role = isAdmin ? 2 : 1;
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    signup(email, password, phone, fullName) {
        return this.http.post<any>(`${environment.api}/customer/create`, { email, password, phone, fullName })
    }
}