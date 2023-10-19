import { TestBed } from '@angular/core/testing';

import { LineEnterpriseService } from './line-enterprise.service';

describe('LineEnterpriseService', () => {
  let service: LineEnterpriseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineEnterpriseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
