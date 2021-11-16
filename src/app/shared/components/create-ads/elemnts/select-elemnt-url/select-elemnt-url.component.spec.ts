import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectElemntUrlComponent } from './select-elemnt-url.component';

describe('SelectElemntUrlComponent', () => {
  let component: SelectElemntUrlComponent;
  let fixture: ComponentFixture<SelectElemntUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectElemntUrlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectElemntUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
