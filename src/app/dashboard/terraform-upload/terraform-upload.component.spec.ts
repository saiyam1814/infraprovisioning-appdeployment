import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerraformUploadComponent } from './terraform-upload.component';

describe('TerraformUploadComponent', () => {
  let component: TerraformUploadComponent;
  let fixture: ComponentFixture<TerraformUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerraformUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerraformUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
