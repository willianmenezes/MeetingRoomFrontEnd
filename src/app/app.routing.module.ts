import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './home/login/login.component';
import { SalasComponent } from './core/salas/salas.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { NotAuthorizedComponent } from './errors/not-authorized/not-authorized.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'sala',
        component: SalasComponent
    },
    {
        path: 'not-found',
        component: NotFoundComponent
    },
    {
        path: 'not-authorized',
        component: NotAuthorizedComponent
    },
    {
        path:'**',
        redirectTo: 'not-found'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}