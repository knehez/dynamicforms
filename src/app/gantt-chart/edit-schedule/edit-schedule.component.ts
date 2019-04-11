import { Component, OnInit, Input, SimpleChanges, OnChanges, ViewChild, EventEmitter, Output } from '@angular/core';
import { DataTable } from 'primeng/datatable';
import { SchedulerService } from '../schedulerService';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css'],
  providers: [DatePipe]
})
export class EditScheduleComponent implements OnInit, OnChanges {
  @Input() schedule;
  @Input() scheduleLog;
  @Input() selectedJob;
  @Input() result;
  @Input() id;
  @Output() rowSelect = new EventEmitter();
  averageUtilization;
  jobs;
  selectedJobName;
  jobCols = [
    { field: 'name', header: 'Job Name' },
    { field: 'pieceType', header: 'Job Type' },
    { field: 'numOfPieces', header: 'Num of pieces' },
    { field: 'dueDate', header: 'Due Date', pipe: this.datePipe, arg: 'yyyy-MM-dd' },
    { field: 'timeStarted', header: 'Time Started' },
    { field: 'timeFinished', header: 'Time Finished' },
    { field: 'timeSchedule', header: 'Time Schedule' }
  ];

  @ViewChild('dt') dataTable: DataTable;

  constructor(private schedulerService: SchedulerService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.jobs = this.scheduleLog.jobs;
    for (const job of this.jobs) {
      job.selectedOperation = [];
    }
  }

  selectJob(rowData) {
    if (rowData == null) {
      return;
    }
    this.selectedJobName = rowData.name;
    this.dataTable.selection = rowData;

    let i = 0;
    rowData.selectedOperation = [];
    for (const op of rowData.routePath) {
      rowData.selectedOperation[i] = rowData.route.operations[i][op];
      i++;
    }
  }

  selectOperation(rowData, event, i) {
    rowData.selectedOperation[i] = event;
    // set new operation and save it
    const newIndex = rowData.route.operations[i].indexOf(event);
    rowData.routePath[i] = newIndex;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.entity !== undefined && changes.entity.currentValue !== undefined && !changes.entity.firstChange) {
      this.jobs = changes.entity.currentValue.jobs;
      this.result = changes.entity.currentValue.result;
      this.selectJob(this.jobs.filter(j => j.name === this.selectedJobName)[0]);
    }
    if (changes.result !== undefined && changes.result.currentValue !== undefined && !changes.result.firstChange) {
      this.result = changes.result.currentValue;
    }
    if (changes.scheduleLog !== undefined && changes.scheduleLog.currentValue !== undefined && !changes.scheduleLog.firstChange) {
      this.jobs = changes.scheduleLog.currentValue.jobs;
      this.selectJob(this.jobs.filter(j => j.name === this.selectedJobName)[0]);
    }
    if (changes.selectedJob !== undefined && changes.selectedJob.currentValue !== undefined && !changes.selectedJob.firstChange) {
      let i = 0;
      for (i = 0; i < this.jobs.length; i++) {
        if (this.jobs[i].name === changes.selectedJob.currentValue.name) {
          this.selectJob(changes.selectedJob.currentValue);
          this.dataTable.first = Math.floor(i / this.dataTable.rows) * this.dataTable.rows;
          break;
        }
      }
    }
  }

  async saveSchedule() {
    // save scheduling
    await this.schedulerService.updateScheduling({
      id: this.id,
      description: this.schedule.description,
      date: this.schedule.date, log: JSON.stringify([this.scheduleLog]), result: JSON.stringify(this.result)
    }, this.id);
  }
}
