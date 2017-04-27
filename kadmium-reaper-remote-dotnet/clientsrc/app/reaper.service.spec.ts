import { TestBed, inject } from '@angular/core/testing';

import { ReaperService } from './reaper.service';

describe('ReaperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReaperService]
    });
  });

  it('should ...', inject([ReaperService], (service: ReaperService) => {
    expect(service).toBeTruthy();
  }));
});
