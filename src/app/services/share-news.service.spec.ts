import { TestBed } from '@angular/core/testing';

import { ShareNewsService } from './share-news.service';

describe('ShareNewsService', () => {
  let service: ShareNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
