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
    reservasCadastro: Reserva[] = [];
    statusBotaoReservas: boolean;

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
                    
                    // resetando array e ocultando botao
                    this.reservasCadastro = [];
                    this.horarioService.setBotaoReserva(false);
                }

            }, (erro) => {
                alertfy.error(erro.error.Message);
                console.log(erro);
            });
    }

    ngOnInit(): void {

        // resetando array e ocultando botao
        this.reservasCadastro = [];
        this.horarioService.setBotaoReserva(false);

        this.horarioService
            .getBotaoReserva()
            .subscribe((status: boolean) => {
                this.statusBotaoReservas = status;
            })

        this.idSala = this.activatedRoute.snapshot.params.id;

        // busca o nome da sala para exibir no topo do componente
        this.buscaSalaById(this.activatedRoute.snapshot.params.id);

        this.buscaHorarios();

        $("#inputData").val(formatDate(new Date(), 'yyyy-MM-dd', 'en-US'));
    }

    buscaHorarios() {
        this.horarioService
            .getReservaByidSala(this.activatedRoute.snapshot.params.id)
            .subscribe((reservas: Reserva[]) => {
                console.log(reservas);

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

        if (data != undefined && data != "") {

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

    // seleciona as reservas para cadastyrar em grupo
    selecionarReservas(checked: boolean, reserva: Reserva) {

        if (checked) {

            this.reservasCadastro.push(reserva);

        } else {

            let index = this.reservasCadastro.indexOf(reserva);

            this.reservasCadastro.splice(index);
        }

        if (this.reservasCadastro.length > 0) {
            this.horarioService.setBotaoReserva(true);
        } else {
            this.horarioService.setBotaoReserva(false);
        }
    }

    reservarLista() {

        // inserindo o id da sala em cada reserva
        this.reservasCadastro = this.reservasCadastro.map((reservarLista) => {
            reservarLista.nidSala = this.idSala;
            return reservarLista;
        });

        this.horarioService.setReservasLista(this.reservasCadastro);
    }
}