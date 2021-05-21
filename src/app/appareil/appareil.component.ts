import {Component, Input, OnInit} from '@angular/core';
import {AppareilService} from '../services/appareil.service';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {

  @Input() appareilName: string | undefined;
  @Input() appareilStatus: string | undefined;
  // @ts-ignore
  @Input() indexOfAppareil: number;
  // @ts-ignore
  @Input() id: number;

  constructor(private appareilService: AppareilService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  getStatus(): string | undefined {
    return this.appareilStatus;
  }

  // tslint:disable-next-line:typedef
  // @ts-ignore
  // tslint:disable-next-line:typedef
  getColor() {
    if (this.appareilStatus === 'allumé') {
      return 'green';
    } else if (this.appareilStatus === 'éteint') {
      return 'red';
    }
  }

  onSwitchOn(): void {
    this.appareilService.switchOnOne(this.indexOfAppareil);
  }

  onSwitchOff(): void {
    this.appareilService.switchOffOne(this.indexOfAppareil);
  }

  onDelete(id: number): void | null {
    if (confirm('Etes vous sur de vouloir supprimer cette machine ?')) {
      this.appareilService.deleteAppareil(id);
    } else {
      return null;
    }
  }
}
