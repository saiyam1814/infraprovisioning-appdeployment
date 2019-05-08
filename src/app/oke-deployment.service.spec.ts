import { TestBed } from '@angular/core/testing';

import { OkeDeploymentService } from './oke-deployment.service';

describe('OkeDeploymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OkeDeploymentService = TestBed.get(OkeDeploymentService);
    expect(service).toBeTruthy();
  });
});
