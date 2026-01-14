import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalHistoryCard } from './eval-history-card';

describe('EvalHistoryCard', () => {
  let component: EvalHistoryCard;
  let fixture: ComponentFixture<EvalHistoryCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvalHistoryCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvalHistoryCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
