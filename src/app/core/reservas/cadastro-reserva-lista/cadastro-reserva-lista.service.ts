import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Reserva } from 'src/app/Models/Reserva';
import { URL_API } from 'src/app/app-api';

@Injectable({
    providedIn: 'root'
})
export class CadastroReservaListaService {

    
    constructor(
        private http: HttpClient
    ) { }

    postReservasLista(reservas: Reserva[]) {
        return this.http.post<Reserva[]>(`${URL_API}Reservas/Lista`, JSON.stringify(reservas), { observe: 'body' });
    }

}