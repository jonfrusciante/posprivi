import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TichetOrderComponent } from './tichet-order.component';

describe('TichetOrderComponent', () => {
  let component: TichetOrderComponent;
  let fixture: ComponentFixture<TichetOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TichetOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TichetOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
