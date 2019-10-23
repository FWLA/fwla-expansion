import * as L from 'leaflet';
import { NgElement, WithProperties } from '@angular/elements';
import { GridControlComponent } from './grid-control.component';

export class GridControl extends L.Control {

  private gridControlElement: NgElement & WithProperties<GridControlComponent>;
  private circles: L.Circle[] = [];
  private map: L.Map;
  private center: L.LatLng = null;

  private speed: number = 5.5;
  private interval: number = 120;
  private maxtime: number = 1200;

  constructor(options?: L.ControlOptions) {
    super(options);
  }

  getSpeedInKmh(): number {
    return this.speed * 3.6;
  }

  setSpeedInKmh(speed: number) {
    this.speed = speed / 3.6;
    this.internalRedraw();
  }

  getIntervalInMinutes(): number {
    return this.interval / 60;
  }

  setIntervalInMinutes(interval: number) {
    this.interval = interval * 60;
    this.internalRedraw();
  }

  getMaxTimeInMinutes(): number {
    return this.maxtime / 60;
  }

  setMaxTimeInMinutes(maxtime: number) {
    this.maxtime = maxtime * 60;
    this.internalRedraw();
  }

  onAdd(map: L.Map): HTMLElement {
    this.map = map;
    this.gridControlElement = document.createElement('grid-control') as any;
    this.gridControlElement.control = this;
    return this.gridControlElement;
  }

  clear() {
    this.circles.forEach(circle => this.map.removeLayer(circle));
    this.circles = [];
  }

  redrawGrid(latLng: L.LatLng) {
    this.center = latLng;
    this.internalRedraw();
  }

  private internalRedraw() {
    this.clear();
    if (this.center) {
      for (let i = this.interval; i <= this.maxtime; i += this.interval) {
        this.circles.push(new L.Circle(this.center, {
          radius: this.calculateDistanceAfterTimeInMeter(i),
          color: '#ff0000',
          fillColor: '#ff0000',
          fillOpacity: 0.03,
        }).addTo(this.map));
      }
    }
  }

  private calculateDistanceAfterTimeInMeter(timeInSeconds: number): number {
    return this.speed * timeInSeconds;
  }
}
