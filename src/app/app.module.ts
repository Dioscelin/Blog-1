import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RootComponent } from './root.component';
import { ROUTING } from './app.routing';


@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    BrowserModule,
    ROUTING,
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }



