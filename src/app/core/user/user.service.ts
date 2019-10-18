import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import * as jwt_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { DataUserToken } from 'src/app/Models/DataUserToken';
import { URL_API } from 'src/app/app-api';
import { PostUpdateSenha } from 'src/app/Models/PostUpdateSenha';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    //classe responsável por manipular as ações do usuário
    //logado, sair, decodificar o token em um usuário tipado

    private user: DataUserToken;
    private user$ = new BehaviorSubject<DataUserToken>(null);

    constructor(
        private tokenService: TokenService,
        private http: HttpClient) {
        this.tokenService.hasToken() && this.decodeJWT();
    }

    setToken(token: string): void {
        this.tokenService.setToken(token);
        this.decodeJWT();
    }

    setRefreshToken(refresh: string) {
        this.tokenService.setRefereshToken(refresh);
    }

    isLogged(): boolean {
        return this.tokenService.hasToken();
    }

    sair() {
        this.tokenService.deleteToken();
    }

    // decodifica o token e formata seus dados
    decodeJWT() {
        const token = this.tokenService.getToken();
        const user = jwt_decode(token) as DataUserToken;
        this.user = user;
        this.user$.next(user);
    }

    getUserObservable() {
        return this.user$.asObservable();
    }

    getUser(): DataUserToken {
        return this.user;
    }

    setExpiration(exp: string) {
        this.tokenService.setExpiration(exp);
    }

    getExpiration() {
        return this.tokenService.getExpiration();
    }

    updateSenha(postUpdateSenha: PostUpdateSenha) {
        return this.http.post(`${URL_API}Pessoas`, JSON.stringify(postUpdateSenha), { observe: 'body' });
    }
}