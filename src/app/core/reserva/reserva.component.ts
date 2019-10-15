import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-reserva',
    templateUrl: './reserva.component.html',
    styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

    formReserva: FormGroup;

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.formReserva = this.fb.group({
            DdataHoraIni: ['',
                [
                    Validators.required
                ]
            ],
            DdataHoraFim: ['',
                [
                    Validators.required
                ]
            ],
            NidSala: ['',
                [
                    Validators.required
                ]
            ],
            Stitulo: ['',
                [
                    Validators.required
                ]
            ],
            Sdescricao: ['',
                [
                    Validators.required
                ]
            ]
        });
    }

}