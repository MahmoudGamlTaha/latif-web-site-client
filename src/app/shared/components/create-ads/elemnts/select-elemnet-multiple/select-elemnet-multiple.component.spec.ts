import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectElemnetMultipleComponent } from './select-elemnet-multiple.component';

describe('SelectElemnetMultipleComponent', () => {
  let component: SelectElemnetMultipleComponent;
  let fixture: ComponentFixture<SelectElemnetMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectElemnetMultipleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectElemnetMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
