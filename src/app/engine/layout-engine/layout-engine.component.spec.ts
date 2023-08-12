import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutEngineComponent } from './layout-engine.component';

describe('LayoutEngineComponent', () => {
  let component: LayoutEngineComponent;
  let fixture: ComponentFixture<LayoutEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutEngineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
