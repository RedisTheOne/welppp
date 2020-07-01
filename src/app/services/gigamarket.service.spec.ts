import { TestBed } from '@angular/core/testing';

import { GigamarketService } from './gigamarket.service';

describe('GigamarketService', () => {
  let service: GigamarketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GigamarketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
