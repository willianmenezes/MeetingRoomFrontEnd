import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as  alertfy from 'alertifyjs';

import { HorarioSalaService } from './horario-sala.service';
import { Reserva } from 'src/app/Models/Reserva';
import { CadastroReservaService } from '../../reservas/cadastro-reserva/cadastro-reserva.service';
import { SalasService } from '../salas.service';
import { Sala } from 'src/app/Models/Sala';

@Component({
    selector: 'app-horario-sala',
    templateUrl: './horario-sala.component.html',
    styleUrls: ['./horario-sala.component.css']
})
export class HorarioSalaComponent implements OnInit {

    idSala: number;
    sala: Sala;
    reservas: Reserva[];
    reservaClicado: Reserva;
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
                    this.buscaHorarios();
                }

            }, (erro) => {
                alertfy.danger(erro.error.Message);
                console.log(erro);
            });
    }

    ngOnInit(): void {
        this.idSala = this.activatedRoute.snapshot.params.id;

        this.buscaSalaById(this.activatedRoute.snapshot.params.id);

        this.buscaHorarios();
    }

    buscaHorarios() {
        this.horarioService
            .getReservaByidSala(this.idSala)
            .subscribe((reservas: Reserva[]) => {
                this.reservas = reservas;
            }, (erro) => {
                alertfy.danger(erro.error.Message);
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
                    alertfy.danger('Erro ao buscar o nome da sala.');
                }

            }, (erro) => {
                alertfy.danger(erro.error.Message);
                console.log(erro);
            });
    }

    // dados para seram passados para o modal
    chamarModalReserva(reserva: Reserva) {
        this.reservaClicado = reserva;
        this.reservaClicado.nidSala = this.idSala;
    }
}