import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
    declarations: [
        NotAuthorizedComponent,
        NotFoundComponent
    ],
    imports: [
        CommonModule,
        RouterModule],
    exports: []
})
export class ErrorsModule {

}