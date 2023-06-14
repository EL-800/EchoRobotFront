import { TestBed } from '@angular/core/testing';

import { ComunityServiceService } from './comunity-service.service';

describe('ComunityServiceService', () => {
  let service: ComunityServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunityServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
