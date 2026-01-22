import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillDesigner } from './skill-designer';

describe('SkillDesigner', () => {
  let component: SkillDesigner;
  let fixture: ComponentFixture<SkillDesigner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillDesigner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillDesigner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
