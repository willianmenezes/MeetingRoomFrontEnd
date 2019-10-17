import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './home/login/login.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { NotAuthorizedComponent } from './errors/not-authorized/not-authorized.component';
import { HorarioSalaComponent } from './core/salas/horario-sala/horario-sala.component';
import { MenuAplicacao } from './core/menu-apliccao/menu-aplicacao.component';
import { ListaSalasComponent } from './core/salas/lista-salas/lista-salas.component';
import { LoginGuard } from './core/auth/login.guard';
import { AuthGuard } from './core/auth/auth.guard';

// classe responsável por gerenciar as rotas da aplicação

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'home',
        component: MenuAplicacao,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'salas',
                canActivate: [AuthGuard]
            },
            {
                path: 'salas',
                component: ListaSalasComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'horario-sala/:id',
                component: HorarioSalaComponent,
                canActivate: [AuthGuard]
            }
        ]
    },
    {
        path: 'not-found',
        component: NotFoundComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'not-authorized',
        component: NotAuthorizedComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
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