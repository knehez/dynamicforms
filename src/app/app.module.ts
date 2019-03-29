import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrudTableComponent } from './crud-table/crud-table.component';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormComponent } from './crud-table/modal-form/modal-form.component';
import { DynamicFormModule } from './crud-table/dynamic-form/dynamic-form.module';
import { TypeormERDComponent } from './typeorm-erd/typeorm-erd.component';
import { ClickStopPropagationDirective } from './crud-table/click-stop-propagation.directive';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdministrationComponent } from './administration/administration.component';
import { environment } from 'src/environments/environment';
import { GanttChartComponent } from './gantt-chart/gantt-chart.component';
import { AuthHttpInterceptorService } from './_services/auth-http-interceptor.service';
import { EditScheduleComponent } from './gantt-chart/edit-schedule/edit-schedule.component';
import { PickListModule } from 'primeng/picklist';
import { ListboxModule } from 'primeng/listbox';
import { JobEditorComponent } from './gantt-chart/job-editor/job-editor.component';
import { SliderModule } from 'primeng/slider';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ModalImgComponent } from './crud-table/modal-img/modal-img.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

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
    CrudTableComponent,
    ModalFormComponent,
    TypeormERDComponent,
    ClickStopPropagationDirective,
    AppComponent,
    LoginComponent,
    AdministrationComponent,
    GanttChartComponent,
    EditScheduleComponent,
    JobEditorComponent,
    ModalImgComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicFormModule,
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
    RouterModule.forRoot(routes, { enableTracing: !environment.production })
  ],
  entryComponents: [ModalImgComponent],

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
