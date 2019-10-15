import { Component, OnInit } from '@angular/core';

import { Sala } from 'src/app/Models/Sala';
import { SalasService } from './salas.service';

@Component({
    selector: 'app-salas',
    templateUrl: './salas.component.html',
    styleUrls: ['./salas.component.css']
})
export class SalasComponent implements OnInit {

    salas: Sala[];

    constructor(
        private salasService: SalasService
    ) { }

    ngOnInit(): void {
        this.salasService
            .getSalas()
            .subscribe((salas: Sala[]) => {
                this.salas = salas;
                console.log(salas);
            })
    }
}