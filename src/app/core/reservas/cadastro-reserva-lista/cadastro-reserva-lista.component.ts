import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as alertfy from 'alertifyjs';

import { CadastroReservaListaService } from './cadastro-reserva-lista.service';
import { HorarioSalaService } from '../../salas/horario-sala/horario-sala.service';
import { Reserva } from 'src/app/Models/Reserva';
import { DateHelperService } from 'src/app/helpers/date-helper.service';
import { SalasService } from '../../salas/salas.service';
import { Sala } from 'src/app/Models/Sala';
import { UserService } from '../../user/user.service';
import { CadastroReservaService } from '../cadastro-reserva/cadastro-reserva.service';

declare const $:any;

@Component({
    selector: 'app-cadastro-reserva-lista',
    templateUrl: './cadastro-reserva-lista.component.html'
})
export class CadastroReservaListaComponent implements OnInit {

    // classe responsável por cadastrar uma lista de reservas

    formListaReserva: FormGroup
    reservaLista: Reserva[];

    @ViewChild('inputSalas', { static: false }) inputSalas: ElementRef;

    constructor(
        private cadastroReservaListaService: CadastroReservaListaService,
        private horarioService: HorarioSalaService,
        private fb: FormBuilder,
        private dateHelperService: DateHelperService,
        private salasService: SalasService,
        private renderer: Renderer2,
        private userService: UserService,
        private cadastroReservaService: CadastroReservaService
    ) { }

    ngOnInit(): void {

        this.formListaReserva = this.fb.group({
            NidSala: ['',
                [
                    Validators.required
                ]
            ],
            Stitulo: ['',
                [
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.minLength(5)
                ]
            ],
            Sdescricao: ['',
                [
                    Validators.required,
                    Validators.maxLength(300),
                    Validators.minLength(10)
                ]
            ]
        })


        this.horarioService
            .getReservasLista()
            .subscribe((reservas: Reserva[]) => {

                if (reservas != null && reservas.length > 0) {

                    this.reservaLista = reservas;
                    this.setarNomeSala(reservas[0]);
                    this.formListaReserva.get('Sdescricao').setValue('');
                    this.formListaReserva.get('Stitulo').setValue('');

                }

            }, (erro) => {
                console.log(erro);
            });
    }

    reservar() {

        this.reservaLista = this.reservaLista.map((reserva) => {
            reserva.nidPessoa = parseInt(this.userService.getUser().unique_name[1]);
            reserva.sdescricao = this.formListaReserva.get('Sdescricao').value;
            reserva.stitulo = this.formListaReserva.get('Stitulo').value;
            return reserva;
        });

        this.cadastroReservaListaService
            .postReservasLista(this.reservaLista)
            .subscribe(() => {
                alertfy.success('Reserva realizada com sucesso.');

                // Emitindo true para atualizar os horarios
                this.cadastroReservaService.setStatusAtualizacao(true);
                $('#modalReservaLista').modal('hide');
                this.formListaReserva.reset();

            }, (erro) => {
                alertfy.error(erro.error.Message);
                console.log(erro);
            });
    }

    setarNomeSala(reserva: Reserva) {
        // Buscando a sala para usar o nome
        this.salasService
            .getById(reserva.nidSala)
            .subscribe((sala: Sala) => {
                this.formListaReserva.get('NidSala').setValue(`${sala.nidSala} - ${sala.snome}`);

                // desabilitando campos que são preenchidos automáticos
                this.renderer.setAttribute(this.inputSalas.nativeElement, 'disabled', '');
            });
    }

    limparClassesErros() {
        this.formListaReserva.reset();
    }

    formataData(data: string) {
        return this.dateHelperService.formataData(data);
    }

}