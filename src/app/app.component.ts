import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/observable';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy  {

  minutes: number | undefined;
  counterSubscription: Subscription | undefined;

  constructor() {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    const counter = Observable.interval(60000);
    this.counterSubscription = counter.subscribe(
      (value: number) => {
        this.minutes = value;
      }
    );
    }

  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    this.counterSubscription?.unsubscribe();
  }

}
