import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationItemComponent } from './consultation-item.component';

describe('ConsultationItemComponent', () => {
  let component: ConsultationItemComponent;
  let fixture: ComponentFixture<ConsultationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
