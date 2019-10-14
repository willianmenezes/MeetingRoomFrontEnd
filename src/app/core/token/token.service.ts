import { Injectable } from '@angular/core';

const KEY = 'authToken';
const refreshToken = 'refreshToken';
const expiration = 'expiration';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    //classe responsável por manipular o token
    constructor() { }

    setToken(token: string) {
        window.localStorage.setItem(KEY, token);
    }

    setRefereshToken(refresh: string) {
        window.localStorage.setItem(refreshToken, refresh);
    }

    getRefreshToken() {
        return window.localStorage.getItem(refreshToken);
    }

    getToken() {
        return window.localStorage.getItem(KEY);
    }

    deleteToken() {
        window.localStorage.removeItem(KEY);
    }

    hasToken() {
        return !!this.getToken();
    }

    setExpiration(exp: string) {
        window.localStorage.setItem(expiration, exp);
    }

    getExpiration() {
        return window.localStorage.getItem(expiration);
    }

}