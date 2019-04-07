import { TestBed } from '@angular/core/testing';

import { CrudTableLibService } from './crud-table-lib.service';

describe('CrudTableLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrudTableLibService = TestBed.get(CrudTableLibService);
    expect(service).toBeTruthy();
  });
});
