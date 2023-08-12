// creat an angular service to handle the widget engine
// ng g s home/services/widget-engine
import { Injectable, Type } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatCardHeader, MatCardContent, MatCardFooter } from '@angular/material/card';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDivider } from '@angular/material/divider';
import { NcCardComponent } from '../libs/nc-card/nc-card.component';

// injectable decorator
@Injectable({
  providedIn: 'root'
})
export class WidgetEngineService {
  constructor() { }
  
  getComponentType(Name: string): Type<any> {
    // return angular material  type based on  name
    switch (Name) {
      case 'mat-slide-toggle':
        return MatSlideToggle;
      case 'mat-button':
        return MatButton;
      case 'mat-checkbox':
        return MatCheckbox;
      case 'mat-icon':
        return MatIcon;
      case 'mat-progress-spinner':
        return MatProgressSpinner;
      case 'mat-card-header':
        return MatCardHeader;
      case 'mat-card-content':
        return MatCardContent;
      case 'mat-card-footer':
        return MatCardFooter;
      case 'mat-divider':
        return MatDivider;
      case 'app-nc-card':
        return NcCardComponent;
      default:
        return MatSlideToggle;
  }
}
}
