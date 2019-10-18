import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class DateHelperService {

    // formata uma data em um formato reconhecido pelo input
    formataData(data: string) {
        let array = data.split('-');

        let ano = parseInt(array[0]);
        let mes = parseInt(array[1]) - 1;
        let dia = parseInt(array[2].substr(0, 2));
        let hora = parseInt(array[2].substr(3, 2));
        let min = parseInt(array[2].substr(6, 2));

        let novaData = new Date(ano, mes, dia, hora, min);

        let dataFormatada = formatDate(novaData.toString(), 'yyyy-MM-ddTHH:mm', 'en-US');

        return dataFormatada;
    }
}