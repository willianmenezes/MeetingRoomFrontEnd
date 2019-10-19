import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Loading } from './loading';
import { startWith } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    loadingSubject = new Subject<Loading>();

    getLoading(){
        // iniciando observable com stop
        return this.loadingSubject
                    .asObservable()
                    .pipe(startWith(Loading.STOP));
    }

    start(){
        this.loadingSubject.next(Loading.LOADING);
    }

    stop(){
        this.loadingSubject.next(Loading.STOP);
    }

}