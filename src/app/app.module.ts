import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CrudTableComponent } from './crud-table/crud-table.component';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormComponent } from './crud-table/modal-form/modal-form.component';
import { DynamicFormModule } from './crud-table/dynamic-form/dynamic-form.module';
import { TypeormERDComponent } from './typeorm-erd/typeorm-erd.component';

@NgModule({
  declarations: [
    AppComponent,
    CrudTableComponent,
    ModalFormComponent,
    TypeormERDComponent
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
    ButtonModule,
    TableModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
