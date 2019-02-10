import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudTableComponent } from './crud-table.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFormInputComponent } from './dynamic-form/dynamic-form-input.component';
import { InputService } from './dynamic-form/input.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';

describe('CrudTableComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        CalendarModule,
        NgbPaginationModule,
        NgSelectModule,
        DynamicFormModule,
      ],
      declarations: [
      ],
      providers: [],
    }).compileComponents();
  }));

  let component: CrudTableComponent;
  let fixture: ComponentFixture<CrudTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrudTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
