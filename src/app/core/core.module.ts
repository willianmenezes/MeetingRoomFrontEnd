import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ListaSalasComponent } from './salas/lista-salas/lista-salas.component';
import { HorarioSalaComponent } from './salas/horario-sala/horario-sala.component';
import { MenuAplicacao } from './menu-apliccao/menu-aplicacao.component';
import { SalaComponent } from './salas/sala/sala.component';
import { CadastroReservaComponent } from './reservas/cadastro-reserva/cadastro-reserva.component';
import { DetalhesReservaComponent } from './reservas/detalhes-reserva/detalhes-reserva.component';
import { SenhaComponent } from './user/senha/senha.component';

@NgModule({
    declarations: [
        MenuAplicacao,
        ListaSalasComponent,
        SalaComponent,
        CadastroReservaComponent,
        HorarioSalaComponent,
        DetalhesReservaComponent,
        SenhaComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: []
})
export class CoreModule {

}