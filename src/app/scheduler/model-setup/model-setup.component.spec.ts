import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModelSetupComponent } from './model-setup.component';

describe('ModelSetupComponent', () => {
  let component: ModelSetupComponent;
  let fixture: ComponentFixture<ModelSetupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
