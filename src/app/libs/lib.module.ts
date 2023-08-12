// to create a shared angular module
// ng g m shared --flat 
// to create a shared angular service
// ng g s shared/services/widget-engine
// to create a shared angular component
// ng g c shared/components/nc-card

import { NgModule } from '@angular/core';
import { NcCardComponent } from './nc-card/nc-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [NcCardComponent],
  imports: [MatCardModule, MatButtonModule],
  exports: [NcCardComponent]
})
export class LibModule { }
