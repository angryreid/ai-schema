import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicLandingComponent } from './dynamic-landing.component';

describe('DynamicLandingComponent', () => {
  let component: DynamicLandingComponent;
  let fixture: ComponentFixture<DynamicLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
