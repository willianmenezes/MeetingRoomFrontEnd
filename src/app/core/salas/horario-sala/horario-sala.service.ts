import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_API } from 'src/app/app-api';
import { Reserva } from 'src/app/Models/Reserva';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HorarioSalaService {

    idAgenda: number;
    reserva = new BehaviorSubject<Reserva>(null);

    constructor(
        private http: HttpClient
    ) { }

    getReservaByidSala(idSala: number) {
        return this.http.get<Reserva[]>(`${URL_API}Reservas/${idSala}`);
    }

    getReservaByIdSalaDate(idSala: number, dataAgenda: Date) {
        return this.http.post<Reserva[]>(`${URL_API}Reservas/Data/${idSala}`, JSON.stringify(dataAgenda), { observe: 'body' });
    }

    setReservaClicado(reserva: Reserva) {
        this.reserva.next(reserva);
    }

    getReservaClicado() {
        return this.reserva.asObservable();
    }
}