import { Component, OnInit, Input, SimpleChanges, OnChanges, ViewChild, EventEmitter, Output } from '@angular/core';
import { Table } from 'primeng/table';
import { SchedulerService } from '../schedulerService';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-job-editor',
  templateUrl: './job-editor.component.html',
  styleUrls: ['./job-editor.component.css'],
  providers: [DatePipe]
})
export class JobEditorComponent implements OnInit, OnChanges {
  @Input() schedule: any = {};
  @Input() scheduleLog: any = { jobs: [] };
  @Input() selectedJob;
  @Input() result: any = {};
  @Input() id;
  @Output() rowSelect = new EventEmitter();
  @Input() currentTime;
  @Input() baseStartTime;
  averageUtilization;
  jobs;
  selectedJobName;
  jobCols;

  @ViewChild('dt') dataTable: Table;

  // D3 color scheme for consistency with Gantt chart
  private d3Colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];

  constructor(private schedulerService: SchedulerService, private datePipe: DatePipe) { }
  ngOnInit() {
    this.jobs = this.scheduleLog.jobs;
    for (const job of this.jobs) {
      job.selectedOperation = [];
    }

    this.jobCols = [
      { field: 'name', header: 'Job Name' },
      { field: 'pieceType', header: 'Job Type' },
      { field: 'numOfPieces', header: 'Num of pieces' },
      { field: 'dueDate', header: 'Due Date', datePipe: this.datePipe, arg: 'yyyy-MM-dd'},
      {
        field: 'startTime', header: 'Start Time', minPipe: this.datePipe, arg: 'yyyy-MM-dd HH:mm'
      },
      {
        field: 'finishTime', header: 'Finish Time', minPipe: this.datePipe, arg: 'yyyy-MM-dd HH:mm'
      },
      {
        field: 'releaseTime', header: 'Release Time', minPipe: this.datePipe, arg: 'yyyy-MM-dd HH:mm'
      }];

    this.currentTime = this.currentTime - this.baseStartTime;
  }

  // Hash code generator for consistent color assignment (same as Gantt chart)
  private hashCode(str: string): number {
    let hash = 0;
    if (str.length === 0) { return hash; }
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  // Get job color (same logic as Gantt chart)
  getJobColor(jobName: string): string {
    return this.d3Colors[this.hashCode(jobName) % 10];
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

  setReleaseTime(rowData) {
    rowData.releaseTime = (this.currentTime - this.baseStartTime) / (1000 * 60);
  }

  convertToTimeMillis(time) {
    return moment.parseZone(time).toDate().getTime();
  }

  convertToTime(time) {
    return moment.parseZone(time).format('YYYY-MM-DD HH:mm');
  }
}
