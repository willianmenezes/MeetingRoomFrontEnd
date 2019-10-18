import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as alertfy from 'alertifyjs';

import { UserService } from '../user.service';
import { PostUpdateSenha } from 'src/app/Models/PostUpdateSenha';

declare const $: any;

@Component({
    selector: 'app-senha',
    templateUrl: './senha.component.html'
})
export class SenhaComponent implements OnInit {

    formSenha: FormGroup

    constructor(
        private fb: FormBuilder,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.formSenha = this.fb.group({
            email: ['', [Validators.required, Validators.maxLength(50)]],
            password: ['', [Validators.required, Validators.maxLength(50)]]
        })
    }
    alterarSenha() {
        let postUpdateSenha = new PostUpdateSenha();

        postUpdateSenha.senhaAtual = this.formSenha.get('email').value;
        postUpdateSenha.novaSenha = this.formSenha.get('password').value;
        postUpdateSenha.email = this.userService.getUser().unique_name[0];

            this.userService
            .updateSenha(postUpdateSenha)
            .subscribe(() => {
                alertfy.success("Senha alterada com sucesso.");
                $('#modalTrocarSenha').modal('hide');
            }, (erro) => {
                console.log(erro);
                alertfy.error(erro.error.Message);
            });
    }

}