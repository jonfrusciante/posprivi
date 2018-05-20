import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzeriaComponent } from './pizzeria.component';

describe('PizzeriaComponent', () => {
  let component: PizzeriaComponent;
  let fixture: ComponentFixture<PizzeriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PizzeriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzeriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
