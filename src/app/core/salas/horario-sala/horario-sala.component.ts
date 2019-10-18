import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';
import * as  alertfy from 'alertifyjs';

import { HorarioSalaService } from './horario-sala.service';
import { Reserva } from 'src/app/Models/Reserva';
import { CadastroReservaService } from '../../reservas/cadastro-reserva/cadastro-reserva.service';
import { SalasService } from '../salas.service';
import { Sala } from 'src/app/Models/Sala';

declare const $: any;

@Component({
    selector: 'app-horario-sala',
    templateUrl: './horario-sala.component.html',
    styleUrls: ['./horario-sala.component.css']
})
export class HorarioSalaComponent implements OnInit {

    idSala: number;
    sala: Sala;
    reservas: Reserva[];
    statusAtualizacao$: Observable<boolean>; //escutador de eventos


    constructor(
        private activatedRoute: ActivatedRoute,
        private horarioService: HorarioSalaService,
        private cadastroReservaService: CadastroReservaService,
        private salaService: SalasService

    ) {
        this.statusAtualizacao$ = this.cadastroReservaService.getStatusAtualizacao();

        // apos a emissão do dado atualiza a view
        this.statusAtualizacao$
            .subscribe((status) => {

                if (status == true) {
                    if ($("#inputData").val() == "") {
                        $("#inputData").val(formatDate(new Date(), 'yyyy-MM-dd', 'en-US'));
                    }

                    this.buscaHorariosByIdDate($("#inputData").val());
                }

            }, (erro) => {
                alertfy.error(erro.error.Message);
                console.log(erro);
            });
    }

    ngOnInit(): void {

        this.idSala = this.activatedRoute.snapshot.params.id;

        this.buscaSalaById(this.activatedRoute.snapshot.params.id);

        this.buscaHorarios();

        $("#inputData").val(formatDate(new Date(), 'yyyy-MM-dd', 'en-US'));
    }

    buscaHorarios() {
        this.horarioService
            .getReservaByidSala(this.activatedRoute.snapshot.params.id)
            .subscribe((reservas: Reserva[]) => {
                this.reservas = reservas;
            }, (erro) => {
                alertfy.error(erro.error.Message);
                console.log(erro);
            });
    }

    buscaSalaById(id: number) {
        this.salaService
            .getById(id)
            .subscribe((sala: Sala) => {

                if (sala != null && sala != undefined) {
                    this.sala = sala;
                } else {
                    alertfy.error('Erro ao buscar o nome da sala.');
                }

            }, (erro) => {
                alertfy.error(erro.error.Message);
                console.log(erro);
            });
    }

    // dados para seram passados para o modal
    chamarModalReserva(reserva: Reserva) {
        reserva.nidSala = this.idSala;
        this.horarioService.setReservaClicado(reserva);
    }

    buscaHorariosByIdDate(data: string) {

        if (!data == undefined && data != "") {

            let arraydata = data.split('-');
            let dataAgenda = new Date(parseInt(arraydata[0]), parseInt(arraydata[1]) - 1, parseInt(arraydata[2]));

            this.horarioService
                .getReservaByIdSalaDate(this.idSala, dataAgenda)
                .subscribe((reservas: Reserva[]) => {
                    this.reservas = reservas;
                    alertfy.success(`Horários do dia ${formatDate(dataAgenda, 'dd/MM/yyyy', 'en-US')} carregados.`);
                }, (erro) => {
                    alertfy.error(erro.error.Message);
                });
        }

    }
}