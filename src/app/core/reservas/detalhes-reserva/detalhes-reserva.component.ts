import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as  alertfy from 'alertifyjs';

import { Reserva } from 'src/app/Models/Reserva';
import { DetalhesReservaService } from './detalhes-reserva.service';
import { CadastroReservaService } from '../cadastro-reserva/cadastro-reserva.service';

declare const $: any;

@Component({
    selector: 'app-detalhes-reserva',
    templateUrl: './detalhes-reserva.component.html',
    styleUrls: ['./detalhes-reserva.component.css']
})
export class DetalhesReservaComponent implements OnInit, OnChanges {

    @Input() reservaInput: Reserva;
    reserva: Reserva;

    constructor(
        private detalhesReservaService: DetalhesReservaService,
        private cadastroReservaService: CadastroReservaService,
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.reservaInput && this.reservaInput != undefined) {
            this.reserva = this.reservaInput;
        }
    }

    ngOnInit(): void {

    }

    deletarReserva() {
        this.detalhesReservaService
            .deleteReserva(this.reserva.nidReserva)
            .subscribe((reserva: Reserva) => {
                if (reserva == null || reserva == undefined) {
                    alertfy.success('Reserva não encontrada, impossível excluir.');
                } else {
                    alertfy.danger('Reserva excluida com sucesso.');
                    this.cadastroReservaService.setStatusAtualizacao(true);
                    $('#modalDetalhesReserva').modal('hide');
                }
            }, (erro) => {
                alertfy.danger(erro.error.Message);
                console.log(erro);
            })
    }
}