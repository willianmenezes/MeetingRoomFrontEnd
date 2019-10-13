import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalasComponent } from './salas/salas.component';
import { SalaComponent } from './salas/sala/sala.component';

@NgModule({
    declarations: [
        SalasComponent,
        SalaComponent
    ],
    imports: [
        CommonModule
    ],
    exports: []
})
export class CoreModule {

}