import { TestBed, async, inject } from '@angular/core/testing';

import { ActivatechildGuard } from './activatechild.guard';

describe('ActivatechildGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivatechildGuard]
    });
  });

  it('should ...', inject([ActivatechildGuard], (guard: ActivatechildGuard) => {
    expect(guard).toBeTruthy();
  }));
});
