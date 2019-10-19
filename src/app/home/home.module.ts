import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { LoadingModule } from '../shared/loading/loading.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LoadingModule
    ],
    declarations: [LoginComponent],
    exports: [LoginComponent]
})
export class HomeModule {

}