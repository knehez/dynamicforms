import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationComponent } from './administration.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthenticationService } from '../_services/authentication.service';
import { InputService, CrudTableLibModule } from 'projects/crud-table-lib/src/public_api';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TypeormERDComponent } from '../typeorm-erd/typeorm-erd.component';
import { ScheduleSelectorComponent } from '../scheduler/schedule-selector/schedule-selector.component';
import { GanttChartComponent } from '../scheduler/gantt-chart/gantt-chart.component';
import { JobEditorComponent } from '../scheduler/job-editor/job-editor.component';
import { CalendarComponent } from '../scheduler/calendar/calendar.component';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { EditScheduleComponent } from '../scheduler/edit-schedule/edit-schedule.component';
import { StepsModule } from 'primeng/steps';
import { PickListModule } from 'primeng/picklist';
import { SliderModule } from 'primeng/slider';
import { ListboxModule } from 'primeng/listbox';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { SchedulerService } from '../scheduler/schedulerService';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdministrationComponent', () => {
  let component: AdministrationComponent;
  let fixture: ComponentFixture<AdministrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdministrationComponent,
        TypeormERDComponent,
        ScheduleSelectorComponent,
        GanttChartComponent,
        JobEditorComponent,
        CalendarComponent,
        EditScheduleComponent
      ],
      imports: [
        RouterTestingModule,
        NgbModule,
        FormsModule,
        CrudTableLibModule,
        CardModule,
        ToastModule,
        CheckboxModule,
        StepsModule,
        PickListModule,
        ListboxModule,
        SliderModule,
        PanelModule,
        ChartModule,
        TableModule,
        DialogModule,
        ConfirmDialogModule,
        ButtonModule,
        CalendarModule,
        FullCalendarModule,
        HttpClientTestingModule
      ],
      providers: [
        MessageService,
        AuthenticationService,
        InputService,
        SchedulerService,
        ConfirmationService
      ]
    })
    .compileComponents();
  }), 15000);

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
