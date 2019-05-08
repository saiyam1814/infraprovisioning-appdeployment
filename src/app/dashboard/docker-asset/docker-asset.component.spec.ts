import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerAssetComponent } from './docker-asset.component';

describe('DockerAssetComponent', () => {
  let component: DockerAssetComponent;
  let fixture: ComponentFixture<DockerAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockerAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
