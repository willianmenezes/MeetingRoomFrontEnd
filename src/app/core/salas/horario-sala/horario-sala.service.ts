import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_API } from 'src/app/app-api';
import { Reserva } from 'src/app/Models/Reserva';

@Injectable({
    providedIn: 'root'
})
export class HorarioSalaService {

    idAgenda: number;

    constructor(
        private http: HttpClient
    ) { }

    getReservaByidSala(idSala: number) {
        return this.http.get<Reserva[]>(`${URL_API}Reservas/${idSala}`);
    }
}