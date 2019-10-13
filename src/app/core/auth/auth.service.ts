import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { UserService } from '../user/user.service';
import { URL_API } from 'src/app/app-api';
import { Token } from '../../Models/token';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    // classe responsável por autenticar o usuário na aplicação

    constructor
        (
            private http: HttpClient,
            private userService: UserService
        ) { }

    // requisição para a endpoint de login
    autenticacao(usuario: string, senha: string) {

        return this.http
            .post(URL_API + 'Login',
                { usuario, senha, tipoConcessao: 'password' },
                { observe: 'body' })
            .pipe(tap(response => {
                
                // tipando a resposta 
                let token: Token = response as Token;

                if (token.autenticado == true) {
                    //salvando o token e o refresh token no navegador
                    this.userService.setRefreshToken(token.refreshToken);
                    this.userService.setToken(token.accessToken);
                }
               
            }))
    }

}