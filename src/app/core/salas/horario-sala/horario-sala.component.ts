import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as  alertfy from 'alertifyjs';

import { HorarioSalaService } from './horario-sala.service';
import { Reserva } from 'src/app/Models/Reserva';
import { ReservaService } from '../../reserva/reserva.service';

declare const $: any;

@Component({
    selector: 'app-horario-sala',
    templateUrl: './horario-sala.component.html',
    styleUrls: ['./horario-sala.component.css']
})
export class HorarioSalaComponent implements OnInit {

    idSala: number;
    reservas: Reserva[];
    reservaClicado: Reserva;
    statusAtualizacao$: Observable<boolean>; //escutador de eventos


    constructor(
        private activatedRoute: ActivatedRoute,
        private horarioService: HorarioSalaService,
        private reservaService: ReservaService

    ) {
        this.statusAtualizacao$ = this.reservaService.getStatusAtualizacao();

        // apos a emissão do dado atualiza a view
        this.statusAtualizacao$
            .subscribe((status) => {

                if (status == true) {
                    this.buscaHorarios();
                    $('#modalReserva').modal('hide');
                }
                
            },(erro) => {
                alertfy.danger('Erro ao buscar os horarios das salas.');
                console.log(erro);
            });
    }

    ngOnInit(): void {
        this.idSala = this.activatedRoute.snapshot.params.id;

        this.buscaHorarios();
    }

    buscaHorarios() {
        this.horarioService
            .getReservaByidSala(this.idSala)
            .subscribe((reservas: Reserva[]) => {
                this.reservas = reservas;
            },(erro) => {
                alertfy.danger('Erro ao buscar os horarios das salas.');
                console.log(erro);
            });
    }

    // dados para seram passados para o modal
    chamarModalReserva(reserva: Reserva) {
        this.reservaClicado = reserva;
        this.reservaClicado.nidSala = this.idSala;
    }
}