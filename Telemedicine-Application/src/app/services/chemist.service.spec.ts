import { TestBed } from '@angular/core/testing';

import { ChemistService } from './chemist.service';

describe('ChemistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChemistService = TestBed.get(ChemistService);
    expect(service).toBeTruthy();
  });
});
