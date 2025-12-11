import { TestBed } from '@angular/core/testing';

import { AuthcodewordService } from './authcodeword.service';

describe('AuthcodewordService', () => {
  let service: AuthcodewordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthcodewordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
