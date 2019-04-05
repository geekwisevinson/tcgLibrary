import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLayoutsListComponent } from './form-layouts-list.component';

describe('FormLayoutsListComponent', () => {
  let component: FormLayoutsListComponent;
  let fixture: ComponentFixture<FormLayoutsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLayoutsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLayoutsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
