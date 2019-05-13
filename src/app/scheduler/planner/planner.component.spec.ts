import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerComponent } from './planner.component';
import { SchedulerService } from '../schedulerService';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StepsModule } from 'primeng/steps';
import { PickListModule } from 'primeng/picklist';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { ChartModule } from 'primeng/chart';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

describe('PlannerComponent', () => {
  let component: PlannerComponent;
  let fixture: ComponentFixture<PlannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannerComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        StepsModule,
        DropdownModule,
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
    fixture = TestBed.createComponent(PlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
