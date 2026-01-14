import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandSidebar } from './brand-sidebar';

describe('BrandSidebar', () => {
  let component: BrandSidebar;
  let fixture: ComponentFixture<BrandSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
