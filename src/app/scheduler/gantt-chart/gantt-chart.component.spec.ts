import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttChartComponent } from './gantt-chart.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { EditScheduleComponent } from '../edit-schedule/edit-schedule.component';
import { TableModule } from 'primeng/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SchedulerService } from '../schedulerService';

describe('GanttChartComponent', () => {
  let component: GanttChartComponent;
  let fixture: ComponentFixture<GanttChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GanttChartComponent,
        EditScheduleComponent
      ],
      imports: [
        FormsModule,
        CheckboxModule,
        TableModule,
        HttpClientTestingModule
      ],
      providers: [
        SchedulerService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
