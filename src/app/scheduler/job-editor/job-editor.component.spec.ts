import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobEditorComponent } from './job-editor.component';
import { SchedulerService } from '../schedulerService';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StepsModule } from 'primeng/steps';
import { PickListModule } from 'primeng/picklist';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { ChartModule } from 'primeng/chart';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';

describe('JobEditorComponent', () => {
  let component: JobEditorComponent;
  let fixture: ComponentFixture<JobEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobEditorComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        StepsModule,
        PickListModule,
        PanelModule,
        CheckboxModule,
        ChartModule,
        SliderModule
      ],
      providers: [
        SchedulerService
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
