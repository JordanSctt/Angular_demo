import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit, OnDestroy {

  isAuth = false;

  lastUpdate = new Date();

  appareils: any[] | undefined;
  appareilSubscription: Subscription | undefined;

  constructor(private appareilService: AppareilService) {
    setTimeout(
      () => {
        this.isAuth = true;
        }, 1000
    );
  }

  ngOnInit(): void {
    this.appareilSubscription = this.appareilService.appareilSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
      }
    );
    this.appareilService.emitAppareilSubject();
  }

  onAllumer(): void | null {
    if (confirm('Etes vous sur de vouloir tout allumer ?')) {
      this.appareilService.switchOnAll();
    } else {
      return null;
    }
  }

  onEteindre(): void | null {
    if (confirm('Etes vous sur de vouloir tout éteindre ?')) {
      this.appareilService.switchOffAll();
    } else {
      return null;
    }
  }

  // onSave() {
  //   this.appareilService.saveAppareilsToServer();
  // }

  // onFetch() {
  //   this.appareilService.getAppareilsFromServer();
  // }

  ngOnDestroy() {
    this.appareilService.saveAppareilsToServer();
  }

}
