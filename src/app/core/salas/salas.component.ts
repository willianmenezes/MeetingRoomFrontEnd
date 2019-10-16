import { Component, OnInit } from '@angular/core';
import * as  alertfy from 'alertifyjs';

import { Sala } from 'src/app/Models/Sala';
import { SalasService } from './salas.service';

declare const $: any;

@Component({
    selector: 'app-salas',
    templateUrl: './salas.component.html',
    styleUrls: ['./salas.component.css']
})
export class SalasComponent implements OnInit {

    // Classe responsável por listas todas as salas
    salas: Sala[];

    constructor(
        private salasService: SalasService
    ) { }

    ngOnInit(): void {
        this.buscaSalas();
    }

    buscaSalas() {
        this.salasService
            .getSalas()
            .subscribe((salas: Sala[]) => {
                this.salas = salas;
            }, (erro) => {
                alertfy.danger('Erro ao buscar as salas.');
                console.log(erro);
            });
    }
}