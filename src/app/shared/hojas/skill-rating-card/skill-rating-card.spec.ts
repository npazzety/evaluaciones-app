import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillRatingCard } from './skill-rating-card';

describe('SkillRatingCard', () => {
  let component: SkillRatingCard;
  let fixture: ComponentFixture<SkillRatingCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillRatingCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillRatingCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
