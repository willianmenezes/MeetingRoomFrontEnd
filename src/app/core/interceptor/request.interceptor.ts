import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as alertfy from 'alertifyjs';

import { TokenService } from '../token/token.service';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { catchError, flatMap } from 'rxjs/operators';
import { URL_API } from 'src/app/app-api';
import { Token } from 'src/app/Models/token';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    //classe responsável por interceptar todas as requisições para o servidor e setar um token caso exista

    constructor(
        private tokenService: TokenService,
        private router: Router,
        private userService: UserService,
        private http: HttpClient
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.tokenService.hasToken()) {

            const token = this.tokenService.getToken();

            //clonando a requisição e setando o header com o token
            if (token) {
                req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
            }

            if (!req.headers.has('Content-Type')) {
                req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
            }

            req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        }

        //verificando erros do retorno para fazer ou não uma nova requisição
        return next.handle(req).pipe(catchError((error) => {

            if (error.status == 401 && error.statusText == "OK") {

                //buscando o email do usuário no token armazenado
                let usuario = this.userService.getUser().unique_name[0];
                let expiration = this.tokenService.getExpiration();

                let refreshToken = this.tokenService.getRefreshToken();

                //refazendo a requisição para o refresh token
                return this.http
                    .post(URL_API + 'Login',
                        { usuario, refreshToken, tipoConcessao: 'refresh_token', expiration },
                        { observe: 'response' })

                    //mescando as requisições e emitindo apenas uma no final
                    .pipe(flatMap(resp => {

                        let token: Token = resp.body.valueOf() as Token;

                        //caso o token retornado seja difirente undefined, significa que o token secundario ainda é valido
                        if (token.accessToken != undefined) {
                            this.userService.setToken(token.accessToken);
                            this.userService.setRefreshToken(token.refreshToken);

                            //criando e emitindo uma nova requisição requisição com os dados do token atualizado
                            const cloneReq = req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token.accessToken) });

                            return next.handle(req);
                        } else {
                            this.tokenService.deleteToken();
                            this.router.navigate(['']);
                            alertfy.warning("Sessão expidara. Realize o login novamente.");
                        }
                    }));
            } else if (error.status == 0 && error.statusText == "Unknown Error") {
                alertfy.error("Servidor indisponível.");
                this.tokenService.deleteToken();
                this.router.navigate(['']);

            } else {
                throw error;
            }
        }));
    }
}