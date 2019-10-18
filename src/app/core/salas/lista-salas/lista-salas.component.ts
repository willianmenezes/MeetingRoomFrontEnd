import { Component, OnInit } from '@angular/core';
import * as  alertfy from 'alertifyjs';

import { Sala } from 'src/app/Models/Sala';
import { SalasService } from '../salas.service';
import { CadastrarSalaService } from '../cadastrar-sala/cadastrar-sala.service';

declare const $: any;

@Component({
    selector: 'app-lista-salas',
    templateUrl: './lista-salas.component.html',
    styleUrls: ['./lista-salas.component.css']
})
export class ListaSalasComponent implements OnInit {

    // Classe responsável por listas todas as salas
    salas: Sala[];

    constructor(
        private salasService: SalasService,
        private cadastrarSalaService: CadastrarSalaService
    ) { }

    ngOnInit(): void {

        this.cadastrarSalaService
            .getStatusSala()
            .subscribe((statusSala: boolean) => {
                if (statusSala == true) {
                    this.buscaSalas();
                }
            });

            this.buscaSalas();
    }

    buscaSalas() {
        this.salasService
            .getSalas()
            .subscribe((salas: Sala[]) => {
                this.salas = salas;
            }, (erro) => {
                alertfy.error(erro.error.Message);
                console.log(erro);
            });
    }
}