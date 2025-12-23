import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionHabilidades } from './gestion-habilidades';

describe('GestionHabilidades', () => {
  let component: GestionHabilidades;
  let fixture: ComponentFixture<GestionHabilidades>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionHabilidades]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionHabilidades);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
