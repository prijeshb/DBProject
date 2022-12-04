import { TestBed } from '@angular/core/testing';

import { ConsultationItemService } from './consultation-item.service';

describe('ConsultationItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultationItemService = TestBed.get(ConsultationItemService);
    expect(service).toBeTruthy();
  });
});
