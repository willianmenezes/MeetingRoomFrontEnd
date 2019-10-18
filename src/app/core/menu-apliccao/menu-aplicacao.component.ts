import { Component } from '@angular/core';

import { UserService } from '../user/user.service';
import { DataUserToken } from 'src/app/Models/DataUserToken';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu-aplicacao',
    templateUrl: './menu-aplicacao.component.html',
    styleUrls: ['./menu-aplicacao.component.css']
})
export class MenuAplicacao {

    apelidoUsuario: string

    constructor(
        private userService: UserService,
        private router: Router
    ) {

        this.userService
            .getUserObservable()
            .subscribe((user) => {
                this.apelidoUsuario = user.unique_name[5];
            });
    }

    sair() {
        this.userService.sair();
        this.router.navigate(['']);
    }

}