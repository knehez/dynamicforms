import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobEditorComponent } from './job-editor.component';

describe('JobEditorComponent', () => {
  let component: JobEditorComponent;
  let fixture: ComponentFixture<JobEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
