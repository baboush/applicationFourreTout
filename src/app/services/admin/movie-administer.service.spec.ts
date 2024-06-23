import { TestBed } from '@angular/core/testing';

import { MovieAdministerService } from './movie-administer.service';

describe('MovieAdministerService', () => {
  let service: MovieAdministerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieAdministerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
