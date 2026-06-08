import { TestBed } from '@angular/core/testing';

import { WorldcupService } from './worldcup.service';

describe('WorldcupService', () => {
  let service: WorldcupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorldcupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
