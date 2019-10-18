import { Component, OnInit, Input, OnChanges, SimpleChanges, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import * as  alertfy from 'alertifyjs';

import { Reserva } from 'src/app/Models/Reserva';
import { SalasService } from '../../salas/salas.service';
import { Sala } from 'src/app/Models/Sala';
import { UserService } from '../../user/user.service';
import { CadastroReservaService } from './cadastro-reserva.service';
import { DateHelperService } from 'src/app/helpers/date-helper.service';

declare const $: any;

@Component({
    selector: 'app-cadastro-reserva',
    templateUrl: './cadastro-reserva.component.html',
    styleUrls: ['./cadastro-reserva.component.css']
})
export class CadastroReservaComponent implements OnInit, OnChanges {
    // classe responsável por reservar um ou mais horarios das salas

    @Input() reserva: Reserva;
    @ViewChild('inputDtaIni', { static: false }) inputDtaIni: ElementRef;
    @ViewChild('inputDtaFim', { static: false }) inputDtaFim: ElementRef;
    @ViewChild('inputSala', { static: false }) inputSala: ElementRef;
    formReserva: FormGroup;

    constructor(
        private fb: FormBuilder,
        private renderer: Renderer2,
        private salasService: SalasService,
        private cadastroReservaService: CadastroReservaService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private dateHelperService: DateHelperService
    ) { }

    // captura mudanças no @Input
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.reserva && this.reserva != undefined) {

            this.formReserva.get('DdataHoraIni').setValue(this.formataData(this.reserva.ddataHoraIni.toString()));
            this.formReserva.get('DdataHoraFim').setValue(this.formataData(this.reserva.ddataHoraFim.toString()));
            this.formReserva.get('Sdescricao').setValue('');
            this.formReserva.get('Stitulo').setValue('');  

            // Buscando a sala para usar o nome
            this.salasService
                .getById(this.reserva.nidSala)
                .subscribe((sala: Sala) => {
                    this.formReserva.get('NidSala').setValue(`${sala.nidSala} - ${sala.snome}`);
                });

            // desabilitando campos que são preenchidos automáticos
            this.renderer.setAttribute(this.inputDtaIni.nativeElement, 'disabled', '');
            this.renderer.setAttribute(this.inputDtaFim.nativeElement, 'disabled', '');
            this.renderer.setAttribute(this.inputSala.nativeElement, 'disabled', '');

        }
    }

    formataData(data: string){
        return this.dateHelperService.formataData(data);
    }

    ngOnInit(): void {
        // Criando formulário na classe
        this.formReserva = this.fb.group({
            DdataHoraIni: ['',
                [
                    Validators.required
                ]
            ],
            DdataHoraFim: ['',
                [
                    Validators.required
                ]
            ],
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
        });
    }

    reservar() {

        let reserva: Reserva = new Reserva();

        // capturando dados da viwe/formulário
        reserva.ddataHoraIni = this.formReserva.get('DdataHoraIni').value;
        reserva.ddataHoraFim = this.formReserva.get('DdataHoraFim').value;
        reserva.sdescricao = this.formReserva.get('Sdescricao').value;
        reserva.stitulo = this.formReserva.get('Stitulo').value;
        reserva.nidPessoa = parseInt(this.userService.getUser().unique_name[1]);
        reserva.nidSala = this.activatedRoute.snapshot.params.id;


        this.cadastroReservaService
            .postReserva(reserva)
            .subscribe(() => {

                alertfy.success('Reserva realizada com sucesso.');

                // Emitindo true para atualizar os horarios
                this.cadastroReservaService.setStatusAtualizacao(true);
                $('#modalReserva').modal('hide');

            }, (erro) => {
                alertfy.error(erro.error.Message);
                console.log(erro);
            });
    }
}