import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormInputComponent } from './dynamic-form-input.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileHandlerService } from './fileHandler.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';

describe('DynamicFormInputComponent', () => {
  let component: DynamicFormInputComponent;
  let fixture: ComponentFixture<DynamicFormInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormInputComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        CalendarModule
      ],
      providers: [
        FileHandlerService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
