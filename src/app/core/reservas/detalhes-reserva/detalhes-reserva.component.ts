import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as  alertfy from 'alertifyjs';

import { Reserva } from 'src/app/Models/Reserva';
import { DetalhesReservaService } from './detalhes-reserva.service';
import { CadastroReservaService } from '../cadastro-reserva/cadastro-reserva.service';
import { HorarioSalaService } from '../../salas/horario-sala/horario-sala.service';

declare const $: any;

@Component({
    selector: 'app-detalhes-reserva',
    templateUrl: './detalhes-reserva.component.html',
    styleUrls: ['./detalhes-reserva.component.css']
})
export class DetalhesReservaComponent implements OnInit {

    reserva: Reserva;

    constructor(
        private detalhesReservaService: DetalhesReservaService,
        private cadastroReservaService: CadastroReservaService,
        private horarioSalaService: HorarioSalaService
    ) { }

    ngOnInit(): void {
        this.horarioSalaService
            .getReservaClicado()
            .subscribe((reserva: Reserva) => {
                this.reserva = reserva;
            }, (erro) => {
                console.log(erro);
                alertfy.error("Erro ao buscar a reserva.")
            });
    }

    deletarReserva() {
        this.detalhesReservaService
            .deleteReserva(this.reserva.nidReserva)
            .subscribe((reserva: Reserva) => {
                if (reserva == null || reserva == undefined) {
                    alertfy.error('Reserva não encontrada, impossível excluir.');
                } else {
                    alertfy.success('Reserva excluida com sucesso.');
                    this.cadastroReservaService.setStatusAtualizacao(true);
                    $('#modalDetalhesReserva').modal('hide');
                }
            }, (erro) => {
                alertfy.error(erro.error.Message);
                console.log(erro);
            })
    }
}