import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-schedule-selector',
  templateUrl: './schedule-selector.component.html',
  styleUrls: ['./schedule-selector.component.css']
})
export class ScheduleSelectorComponent implements OnInit {
  @Input() entity;
  @Input() entityName: string;
  @Input() itemsPerPage: number;
  @Input() filter: any;
  @Output() showSchedule = new EventEmitter();

  permissions: any;
  selectedSchedules = [];

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.permissions = this.authService.getRoles();
  }

  goJobEditor() {

  }

  goGanttViewer() {
    for (const schedule of this.selectedSchedules) {
      schedule.log = JSON.parse(schedule.log)[0];
      schedule.result = JSON.parse(schedule.result);
    }
    this.showSchedule.emit(this.selectedSchedules);
  }

  rowSelect(schedule) {
    if (this.selectedSchedules.includes(schedule)) {
      this.selectedSchedules.splice(this.selectedSchedules.indexOf(schedule), 1);
    } else {
      this.selectedSchedules.push(schedule);
    }
  }

}
