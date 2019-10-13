import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_API } from 'src/app/app-api';

@Injectable({
    providedIn: 'root'
})
export class SalasService {

    constructor(private http: HttpClient) { }

    getSalas() {
        return this.http.get(URL_API + 'Salas');
    }

}