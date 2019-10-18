import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as alertfy from 'alertifyjs';

import { CadastrarSalaService } from './cadastrar-sala.service';
import { Sala } from 'src/app/Models/Sala';

declare const $: any;

@Component({
    selector: 'app-cadastrar-sala',
    templateUrl: './cadastrar-sala.component.html'
})
export class CadastrarSalaComponent implements OnInit {

    formCadastrar: FormGroup

    constructor(
        private fb: FormBuilder,
        private cadastrarSalaService: CadastrarSalaService
    ) { }

    ngOnInit(): void {

        this.formCadastrar = this.fb.group({
            nomeSala: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]]
        })

    }

    cadastrarSala() {

        let sala = new Sala();
        sala.snome = this.formCadastrar.get('nomeSala').value;

        if (sala.snome != null || sala.snome != undefined) {

            this.cadastrarSalaService
                .cadastrarSala(sala)
                .subscribe(() => {

                    alertfy.success("Sala cadastrada com sucesso.")
                    this.cadastrarSalaService.setStatusSala(true);
                    $('#modalCadastrarSala').modal('hide');
                    this.formCadastrar.reset();

                }, (erro) => {
                    alertfy.error(erro.error.message);
                    console.log(erro);
                });

        }
    }

}