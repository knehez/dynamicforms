import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditScheduleComponent } from './edit-schedule.component';
import { TableModule } from 'primeng/table';
import { SchedulerService } from '../schedulerService';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EditScheduleComponent', () => {
  let component: EditScheduleComponent;
  let fixture: ComponentFixture<EditScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditScheduleComponent ],
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
    fixture = TestBed.createComponent(EditScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
