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
  @Output() showCalendar = new EventEmitter();
  @Output() showJobEditor = new EventEmitter();

  permissions: any;
  selectedSchedules = [];

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.permissions = this.authService.getRoles();
  }

  goJobEditor() {
    for (const schedule of this.selectedSchedules) {
      schedule.log = JSON.parse(schedule.log)[0];
      this.showJobEditor.emit(schedule.log.jobs);
      // process only the first selection form the list
      return;
    }
  }

  goCalendarView() {
    const calendarEvents = [];
    const schedule = JSON.parse(this.selectedSchedules[0].log);
    const logs = schedule[0].log;
    const startDate = new Date('2016-01-01T08:00').getTime();
    for (const logItem of logs) {
      if (logItem.event === 's' || logItem.event === 'w') {
        const start = startDate + logItem.operationStart * 1000 * 60;
        const end = startDate + logItem.operationEnd * 1000 * 60;
        calendarEvents.push({
          'title': logItem.machine + ' - ' + logItem.job,
          'start': new Date(start),
          'end': new Date(end),
          // 'color': 'red'
        });
      }
    }
    this.showCalendar.emit(calendarEvents);
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
