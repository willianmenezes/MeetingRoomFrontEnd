import { Component, Input, OnInit } from '@angular/core';
import { Sala } from 'src/app/Models/Sala';

@Component({
    selector: 'app-sala',
    templateUrl: './sala.component.html',
    styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {

    // recebe os dados do pai de uma sala para usar no template
    @Input() salaInput: Sala;

    constructor() { }

    ngOnInit(): void {
    }
}