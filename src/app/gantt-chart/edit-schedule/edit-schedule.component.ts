import { Component, OnInit, Input, SimpleChanges, OnChanges, ViewChild, EventEmitter, Output } from '@angular/core';
import { DataTable } from 'primeng/datatable';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css'],
})
export class EditScheduleComponent implements OnInit, OnChanges {
  @Input() entity;
  @Input() selectedJob;
  @Output() rowSelect = new EventEmitter();

  jobs;
  selectedJobName;
  jobCols = [
    { field: 'name', header: 'Job Name' },
    { field: 'pieceType', header: 'Job Type' },
    { field: 'numOfPieces', header: 'Num of pieces' },
    { field: 'dueDate', header: 'Due Date' },
    { field: 'timeFinished', header: 'Time Finished' },
    { field: 'startTime', header: 'Start Time' }
  ];

  @ViewChild('dt') dataTable: DataTable;

  constructor() { }

  ngOnInit() {
    this.jobs = this.entity.jobs;
    for (const job of this.jobs) {
      job.selectedOperation = [];
    }
  }

  selectJob(rowData) {
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
}
