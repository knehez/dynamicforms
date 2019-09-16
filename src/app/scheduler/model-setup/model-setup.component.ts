import { Component, OnInit, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
import * as moment from 'moment';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { TimeShift } from 'src/backend/entities/timeshift';
import { Machine } from 'src/backend/entities/machine';
import { Route } from 'src/backend/entities/route';

@Component({
  selector: 'app-model-setup',
  templateUrl: './model-setup.component.html',
  styleUrls: ['./model-setup.component.css']
})
export class ModelSetupComponent implements OnInit {
  items: MenuItem[];
  actualPermissions: [];
  activeIndex = 0;
  shiftName = 'Shift 1';
  shiftStartTime: Date;
  shiftEndTime: Date;
  timeShiftEntity;
  timeShiftFilter;

  refDate: Date;
  machineEntity = new Machine;
  routeEntity = new Route;
  machineFilter = {};
  routeFilter = {};

  showAllTimeShifts = new EventEmitter();
  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
    this.timeShiftEntity = new TimeShift;
    this.actualPermissions = this.authService.getRoles();

    this.refDate = new Date('2019-05-01 00:00');
    this.shiftStartTime = new Date(this.refDate.getFullYear(), this.refDate.getMonth(), this.refDate.getDate(), 0, 0, 0);
    this.shiftEndTime = new Date(this.refDate.getFullYear(), this.refDate.getMonth(), this.refDate.getDate(), 8, 0, 0);

    this.items = [{
      label: 'Time Shifts',
      command: (event: any) => {
        this.activeIndex = 0;
      }
    },
    {
      label: 'Machines',
      command: (event: any) => {
        this.activeIndex = 1;
      }
    },
    {
      label: 'Routes & Operations',
      command: (event: any) => {
        this.activeIndex = 2;
      }
    }
    ];
  }

  addNewTimeShift() {
    this.showAllTimeShifts.emit();
  }
}
