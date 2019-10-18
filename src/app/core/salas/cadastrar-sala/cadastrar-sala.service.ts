import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { URL_API } from 'src/app/app-api';
import { Sala } from 'src/app/Models/Sala';

@Injectable({
    providedIn: 'root'
})
export class CadastrarSalaService {

    statusSala$ = new BehaviorSubject<boolean>(false);

    constructor(
        private http: HttpClient
    ) { }

    cadastrarSala(sala: Sala) {
        return this.http.post(URL_API + 'Salas', JSON.stringify(sala), { observe: 'body' });
    }

    getStatusSala() {
        return this.statusSala$.asObservable();
    }

    setStatusSala(sala: boolean) {
        this.statusSala$.next(sala);
    }

}