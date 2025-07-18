import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({ providedIn: 'root' })
export class AuthService { 
    private apiUrl = `${environment.apiUrl}/login`;

    constructor(private http: HttpClient) {}

    login(email: string, password: string) {
        return this.http.post<{ token: string }>(`${this.apiUrl}/login`, {
        email,
        password,
        }).pipe(
        tap(response => {
            localStorage.setItem('token', response.token);
        })
        );
    }

    register(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, data);
    }

    logout() {
    localStorage.removeItem('token');
    }
    
    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    saveToken(token: string) {
        localStorage.setItem('token', token);
    }
}