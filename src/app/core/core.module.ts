import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SalasComponent } from './salas/salas.component';
import { SalaComponent } from './salas/sala/sala.component';

@NgModule({
    declarations: [
        SalasComponent,
        SalaComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: []
})
export class CoreModule {

}