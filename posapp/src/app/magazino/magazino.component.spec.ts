import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazinoComponent } from './magazino.component';

describe('MagazinoComponent', () => {
  let component: MagazinoComponent;
  let fixture: ComponentFixture<MagazinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagazinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagazinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
