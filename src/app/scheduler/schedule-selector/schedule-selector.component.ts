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
  @Output() showPlanner = new EventEmitter();

  permissions: any;
  selectedSchedules = [];

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.permissions = this.authService.getRoles();
  }

  goPlanner() {
    for (const schedule of this.selectedSchedules) {
      schedule.log = JSON.parse(schedule.log)[0];
      this.showPlanner.emit({jobs: schedule.log.jobs, scheduleStart: schedule.date});
      // process only the first selection form the list
      return;
    }
  }

  goCalendarView() {
    const calendarEvents = [];
    const schedule = JSON.parse(this.selectedSchedules[0].log);
    const logs = schedule[0].log;
    const startDate = new Date(this.selectedSchedules[0].date).getTime();
    for (const logItem of logs) {
      if (logItem.event === 's' || logItem.event === 'w') {
        const start = startDate + logItem.operationStart * 1000 * 60;
        const end = startDate + logItem.operationEnd * 1000 * 60;
        calendarEvents.push({
          'title': logItem.job,
          'id': logItem.machine,
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
      schedule.scheduleStart = new Date(schedule.date).getTime();
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
