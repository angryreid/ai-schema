import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaRadioComponent } from './schema-radio.component';

describe('SchemaRadioComponent', () => {
  let component: SchemaRadioComponent;
  let fixture: ComponentFixture<SchemaRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemaRadioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
