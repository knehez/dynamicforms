import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JobEditorComponent } from './job-editor.component';
import { TableModule } from 'primeng/table';
import { SchedulerService } from '../schedulerService';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('JobEditorComponent', () => {
  let component: JobEditorComponent;
  let fixture: ComponentFixture<JobEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JobEditorComponent ],
      imports: [
        TableModule,
        FormsModule,
        HttpClientTestingModule
      ],
      providers: [
        SchedulerService,
        DatePipe
      ]
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
