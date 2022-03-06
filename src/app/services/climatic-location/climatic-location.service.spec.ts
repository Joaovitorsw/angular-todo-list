import { TestBed } from '@angular/core/testing';

import { ClimaticLocationService } from './climatic-location.service';

describe('ClimaticLocationService', () => {
  let service: ClimaticLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClimaticLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
