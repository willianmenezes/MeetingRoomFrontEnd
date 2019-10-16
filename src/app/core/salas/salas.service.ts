import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_API } from 'src/app/app-api';
import { Sala } from 'src/app/Models/Sala';

@Injectable({
    providedIn: 'root'
})
export class SalasService {

    constructor(private http: HttpClient) { }

    getSalas() {
        return this.http.get(URL_API + 'Salas');
    }

    getById(id: number) {
        return this.http.get<Sala>(URL_API + 'Salas/' + id);
    }

}