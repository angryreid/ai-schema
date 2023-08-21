import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NcMatModule } from './mat.moudle';
import { LayoutEngineComponent } from './engine/layout-engine/layout-engine.component';
import { WidgetEngineComponent } from './engine/widget-engine/widget-engine.component';
import { LibModule } from './libs/lib.module';
import { DynamicLandingComponent } from './engine/dynamic-landing/dynamic-landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { SchemaButtonComponent } from './libs/schema-button/schema-button.component';

import { LoadingComponent } from './loading/loading.component';
import { HttpClientModule } from '@angular/common/http';
import { SchemaCardComponent } from './libs/schema-card/schema-card.component';
import { SchemaTableComponent } from './libs/schema-table/schema-table.component';
import { SchemaRadioComponent } from './libs/schema-radio/schema-radio.component';
import { SchemaInputComponent } from './libs/schema-input/schema-input.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutEngineComponent,
    WidgetEngineComponent,
    DynamicLandingComponent,
    DashboardComponent,
    SchemaButtonComponent,
    LoadingComponent,
    SchemaCardComponent,
    SchemaTableComponent,
    SchemaRadioComponent,
    SchemaInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NcMatModule,
    LibModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
