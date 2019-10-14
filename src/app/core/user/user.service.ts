import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import * as jwt_decode from 'jwt-decode';

import { DataUserToken } from 'src/app/Models/DataUserToken';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    //classe responsável por manipular as ações do usuário
    //logado, sair, decodificar o token em um usuário tipado

    private user: any;

    constructor(private tokenService: TokenService) {
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

    logout() {
        this.tokenService.deleteToken();
    }

    decodeJWT() {
        const token = this.tokenService.getToken();
        const user = jwt_decode(token) as DataUserToken;
        this.user = user;
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
}