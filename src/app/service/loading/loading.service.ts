import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingBS = new Subject<boolean>();

  constructor() {
  }

  show() {
    this.loadingBS.next(true);
  }

  hide() {
    this.loadingBS.next(false);
  }

  getLoadingObservable(): Observable<boolean> {
    return this.loadingBS.asObservable();
  }
}
