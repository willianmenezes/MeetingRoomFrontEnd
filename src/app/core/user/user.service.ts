import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { jwt_decode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    //classe responsável por manipular as ações do usuário
    //logado, sair, decodificar o token em um usuário tipado

    private userSubject = new BehaviorSubject<any>(null);
    private user: any;

    constructor(private tokenService: TokenService) {
        // this.tokenService.hasToken() && this.decodeJWT();
     }

    setToken(token: string): void {
        this.tokenService.setToken(token);
        // this.decodeJWT();
    }

    setRefreshToken(refresh: string){
        this.tokenService.setRefereshToken(refresh);
    }

    isLogged(): boolean {
        return this.tokenService.hasToken();
    }

    logout(){
        this.tokenService.deleteToken();
    }

    getUserObservable(){
        return this.userSubject.asObservable();
    }

    decodeJWT(){
        const token = this.tokenService.getToken();
        const user = jwt_decode(token) as any;
        this.user = user;
        this.userSubject.next(user);
    }

    getUser(): any{
        return this.user;
    }

}