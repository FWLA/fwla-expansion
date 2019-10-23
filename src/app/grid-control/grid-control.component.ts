import { Component, OnInit, Input } from '@angular/core';
import { GridControl } from './GridControl';

@Component({
  selector: 'app-grid-control',
  templateUrl: './grid-control.component.html',
  styleUrls: ['./grid-control.component.scss']
})
export class GridControlComponent implements OnInit {

  @Input() control: GridControl;

  constructor() { }

  ngOnInit() {
  }

  setSpeed(speed: number) {
    this.control.setSpeedInKmh(speed);
  }

  getSpeed(): number {
    return this.control.getSpeedInKmh();
  }

  setInterval(interval: number) {
    this.control.setIntervalInMinutes(interval);
  }

  getInterval(): number {
    return this.control.getIntervalInMinutes();
  }

  setMaxTime(maxTime: number) {
    this.control.setMaxTimeInMinutes(maxTime);
  }

  getMaxTime(): number {
    return this.control.getMaxTimeInMinutes();
  }
}
