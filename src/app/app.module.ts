import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppComponent } from './app.component';
import { GridControlComponent } from './grid-control/grid-control.component';


@NgModule({
  declarations: [
    AppComponent,
    GridControlComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LeafletModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    GridControlComponent
  ]
})
export class AppModule {

  constructor(private injector: Injector) {
    var el = createCustomElement(GridControlComponent, { injector: this.injector });
    customElements.define('grid-control', el);
  }
}
