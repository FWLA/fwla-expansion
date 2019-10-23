import { Component } from '@angular/core';
import * as L from 'leaflet';
import { GridControl } from './grid-control/GridControl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private map: L.Map;
  private latLng = L.latLng(49.598520, 8.470561);
  private gridControl = new GridControl({
    position: "topright"
  });

  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 14,
    center: this.latLng
  };

  public onMapReady(map: L.Map) {
    this.map = map;
    this.map.addControl(new L.Control.Scale());
    this.map.addControl(this.gridControl);

    L.marker(this.latLng, {
      draggable: true,
      icon: L.icon({
        iconUrl: 'assets/marker-icon-2x.png',
        shadowUrl: 'assets/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })
    }).on('dragend', (event) => {
      let marker = <L.Marker> event.target;
      this.gridControl.redrawGrid(marker.getLatLng());
    }).addTo(this.map);

    this.gridControl.redrawGrid(this.latLng);
  }
}
