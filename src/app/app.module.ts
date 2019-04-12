import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TypeormERDComponent } from './typeorm-erd/typeorm-erd.component';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdministrationComponent } from './administration/administration.component';
import { environment } from 'src/environments/environment';
import { GanttChartComponent } from './scheduler/gantt-chart/gantt-chart.component';
import { AuthHttpInterceptorService } from './_services/auth-http-interceptor.service';
import { EditScheduleComponent } from './scheduler/edit-schedule/edit-schedule.component';
import { PickListModule } from 'primeng/picklist';
import { ListboxModule } from 'primeng/listbox';
import { JobEditorComponent } from './scheduler/job-editor/job-editor.component';
import { SliderModule } from 'primeng/slider';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ModalDiagramComponent } from './scheduler/modal-diagram/modal-diagram.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ScheduleSelectorComponent } from './scheduler/schedule-selector/schedule-selector.component';

import { CrudTableLibModule } from 'crud-table-lib';
import { CalendarComponent } from './scheduler/calendar/calendar.component';
import { CalendarModule } from 'primeng/calendar';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { StepsModule } from 'primeng/steps';


const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [
    TypeormERDComponent,
    AppComponent,
    LoginComponent,
    AdministrationComponent,
    GanttChartComponent,
    EditScheduleComponent,
    JobEditorComponent,
    ModalDiagramComponent,
    ScheduleSelectorComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CrudTableLibModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
    DialogModule,
    ConfirmDialogModule,
    ButtonModule,
    TableModule,
    ToastModule,
    PickListModule,
    ListboxModule,
    SliderModule,
    CardModule,
    NgbModule,
    ChartModule,
    CheckboxModule,
    CalendarModule,
    FullCalendarModule,
    StepsModule,
    RouterModule.forRoot(routes, { enableTracing: !environment.production })
  ],
  entryComponents: [ModalDiagramComponent],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptorService,
      multi: true
    },
    ConfirmationService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
