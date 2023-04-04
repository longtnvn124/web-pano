
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { XulyAnhComponent } from './xuly-anh/xuly-anh.component';
import { ButtonModule } from 'primeng/button';
@NgModule({
  declarations: [
    AppComponent,
    XulyAnhComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
