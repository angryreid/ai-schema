import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetEngineComponent } from './widget-engine.component';

describe('WidgetEngineComponent', () => {
  let component: WidgetEngineComponent;
  let fixture: ComponentFixture<WidgetEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetEngineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
