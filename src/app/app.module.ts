import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WidgetComponent } from './widget/widget.component';
import { WidgetItemComponent } from './widget-item/widget-item.component';

@NgModule({
  declarations: [
    AppComponent,
    WidgetComponent,
    WidgetItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
