import { TestBed } from '@angular/core/testing';

import { DashboardStatsService } from './dashboard-stats.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DashboardStatsService', () => {
  let service: DashboardStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DashboardStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
