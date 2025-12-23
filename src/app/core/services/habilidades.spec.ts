import { TestBed } from '@angular/core/testing';

import { Habilidades } from './habilidades';

describe('Habilidades', () => {
  let service: Habilidades;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Habilidades);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
