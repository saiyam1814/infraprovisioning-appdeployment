import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KubernetesAssetComponent } from './kubernetes-asset.component';

describe('KubernetesAssetComponent', () => {
  let component: KubernetesAssetComponent;
  let fixture: ComponentFixture<KubernetesAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KubernetesAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KubernetesAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
