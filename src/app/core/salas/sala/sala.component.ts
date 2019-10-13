import { Component, Input } from '@angular/core';
import { Sala } from 'src/app/Models/Sala';

@Component({
    selector: 'app-sala',
    templateUrl: './sala.component.html',
    styleUrls: ['./sala.component.css']
})
export class SalaComponent {

    @Input() sala: Sala;

    constructor() { }

}