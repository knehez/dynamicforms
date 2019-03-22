import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css'],
})
export class EditScheduleComponent implements OnInit, OnChanges {
  @Input() entity;
  @Input() selectedJob;
  constructor() { }
  jobs;
  route;
  routeOrder;
  clickedJob;
  selectedOperation = [];
  startTime;

  async ngOnInit() {
    this.jobs = this.entity.jobs;
  }

  selectJob() {
    this.startTime = this.clickedJob.startTime;
    this.route = this.clickedJob.route.route;
    this.routeOrder = this.clickedJob.routeOrder;
    let i = 0;
    this.selectedOperation = [];
    for (const op of this.routeOrder) {
      this.selectedOperation[i] = this.route[i][op];
      i++;
    }
  }

  setStartTime() {
    this.clickedJob.startTime = this.startTime;
  }

  selectOperation(event, i) {
    this.selectedOperation[i] = event;
    // set new operation and save it
    const newIndex = this.clickedJob.route.route[i].indexOf(event);
    this.routeOrder[i] = newIndex;
    this.clickedJob.startTime = this.startTime;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedJob && !changes.selectedJob.firstChange) {
      this.clickedJob = changes.selectedJob.currentValue;
      this.selectJob();
      // document.querySelector('li.active').scrollIntoView();
    }
  }
}
