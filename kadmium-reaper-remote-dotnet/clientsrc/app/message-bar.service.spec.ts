import { TestBed, inject } from '@angular/core/testing';

import { MessageBarService } from './message-bar.service';

describe('MessageBarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageBarService]
    });
  });

  it('should ...', inject([MessageBarService], (service: MessageBarService) => {
    expect(service).toBeTruthy();
  }));
});
