import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { URL_API } from 'src/app/app-api';
import { Reserva } from 'src/app/Models/Reserva';

@Injectable({
    providedIn: 'root'
})
export class ReservaService {

    //Emissor de eventos
    statusAtualizacao = new BehaviorSubject<boolean>(false);

    constructor(
        private http: HttpClient
    ) { 
        this.getStatusAtualizacao();
    }

    postReserva(reserva: Reserva) {
        return this.http.post(URL_API + 'Reservas', JSON.stringify(reserva), { observe: 'body' });
    }

    getStatusAtualizacao() {
        return this.statusAtualizacao.asObservable();
    }

    setStatusAtualizacao(status: boolean) {
        this.statusAtualizacao.next(status);
    }

}