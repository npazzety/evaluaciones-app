import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingEvaluations } from './pending-evaluations';

describe('PendingEvaluations', () => {
  let component: PendingEvaluations;
  let fixture: ComponentFixture<PendingEvaluations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingEvaluations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingEvaluations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
