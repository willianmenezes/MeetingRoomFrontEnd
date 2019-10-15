import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SalasComponent } from './salas/salas.component';
import { SalaComponent } from './salas/sala/sala.component';
import { ReservaComponent } from './reserva/reserva.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        SalasComponent,
        SalaComponent,
        ReservaComponent
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