import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LoadingService } from './loafing.service';
import { Loading } from './loading';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

    loading$: Observable<string>;

    constructor(
       private loaginService: LoadingService
    ) { }

    ngOnInit(): void {
        this.loading$ = this.loaginService
                            .getLoading()
                            .pipe(map(Loading => Loading.valueOf()));
    }
}