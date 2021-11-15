import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectElemntComponent } from './select-elemnt.component';

describe('SelectElemntComponent', () => {
  let component: SelectElemntComponent;
  let fixture: ComponentFixture<SelectElemntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectElemntComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectElemntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
