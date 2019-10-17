import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reserva } from 'src/app/Models/Reserva';
import { URL_API } from 'src/app/app-api';

@Injectable({
    providedIn: 'root'
})
export class DetalhesReservaService {

    constructor(
        private http: HttpClient
    ) { }

    deleteReserva(idRserva: number) {
        return this.http.delete<Reserva>(`${URL_API}Reservas/${idRserva}`, { observe: 'body' });
    }

}