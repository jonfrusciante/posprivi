import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CucinaComponent } from './cucina.component';

describe('CucinaComponent', () => {
  let component: CucinaComponent;
  let fixture: ComponentFixture<CucinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CucinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CucinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
