import { TestBed } from '@angular/core/testing';

import { ComprobartokenService } from './comprobartoken.service';

describe('ComprobartokenService', () => {
  let service: ComprobartokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComprobartokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
