import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaButtonComponent } from './schema-button.component';

describe('SchemaButtonComponent', () => {
  let component: SchemaButtonComponent;
  let fixture: ComponentFixture<SchemaButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemaButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
