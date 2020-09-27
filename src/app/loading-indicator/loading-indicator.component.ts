import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {LoadingService} from '../service/loading/loading.service';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.css']
})
export class LoadingIndicatorComponent implements OnInit, OnDestroy {
  public showLoadingIndicator = false;
  private subscription: Subscription;

  constructor(
    private loadingService: LoadingService
  ) {
  }

  ngOnInit() {
    this.subscription = this.loadingService.getLoadingObservable().subscribe(loading => {
      this.showLoadingIndicator = loading;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
