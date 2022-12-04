import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemistHomeComponent } from './chemist-home.component';

describe('ChemistHomeComponent', () => {
  let component: ChemistHomeComponent;
  let fixture: ComponentFixture<ChemistHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChemistHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChemistHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
