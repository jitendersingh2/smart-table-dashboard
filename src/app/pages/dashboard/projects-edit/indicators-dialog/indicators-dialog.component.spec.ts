import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorsDialogComponent } from './indicators-dialog.component';

describe('IndicatorsDialogComponent', () => {
  let component: IndicatorsDialogComponent;
  let fixture: ComponentFixture<IndicatorsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
