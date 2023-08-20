import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaInputComponent } from './schema-input.component';

describe('SchemaInputComponent', () => {
  let component: SchemaInputComponent;
  let fixture: ComponentFixture<SchemaInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemaInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
