import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalForm } from './eval-form';

describe('EvalForm', () => {
  let component: EvalForm;
  let fixture: ComponentFixture<EvalForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvalForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvalForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
