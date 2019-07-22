import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import * as moment from 'moment';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { TimeShift } from 'src/backend/entities/timeshift';

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

  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
    this.timeShiftEntity = new TimeShift;
    this.actualPermissions = this.authService.getRoles();
    this.shiftStartTime = new Date(0);
    this.shiftEndTime = new Date(1000 * 60 * 60 * 8);
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
      label: 'Operation Routes',
      command: (event: any) => {
        this.activeIndex = 2;
      }
    }
    ];
  }

}
