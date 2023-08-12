import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcCardComponent } from './nc-card.component';

describe('NcCardComponent', () => {
  let component: NcCardComponent;
  let fixture: ComponentFixture<NcCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NcCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
