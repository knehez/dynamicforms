import { Component, OnInit, Input } from '@angular/core';
import { SchedulerService } from '../schedulerService';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-job-editor',
  templateUrl: './job-editor.component.html',
  styleUrls: ['./job-editor.component.css'],
  providers: [SchedulerService]
})
export class JobEditorComponent implements OnInit {
  targetJobs = [];

  makespan = 20;
  setupTime = 50;
  setups = 10;

  population = 100;
  iteration = 50;
  description = 'Test run ' + ' ' + Math.round(Math.random() * 1000);
  availableJobs;
  socket;
  logs = [];
  data;
  result;
  constructor(private schedulerService: SchedulerService) { }

  async ngOnInit() {
    this.availableJobs = await this.schedulerService.getAllJobs();
    this.socket = socketIo({ 'path': '/socketio' });
    this.socket.on('log', (data) => this.logs.push(data));
  }

  async reschedule() {
    this.logs = [];
    this.result = await this.schedulerService.optimize(this.targetJobs,
      [this.makespan / 100, this.setups / 100, this.setupTime / 100], this.iteration, this.population);
    setTimeout(() => { this.createDiagram(); this.socket.close(); }, 2000);
  }

  async save() {
    // save scheduling
    await this.schedulerService.saveScheduling({
      description: this.description,
      date: '' + new Date(), log: JSON.stringify([this.result])
    });
  }

  createDiagram() {
    const makespanData = this.logs.map(o => o.makespan);
    const setupData = this.logs.map(o => o.numberOfSetups);
    const setupTime = this.logs.map(o => o.setupTime);
    const index = this.logs.map(o => o.i);
    this.data = {
      labels: index,
      datasets: [
        {
          label: 'Makespan',
          data: makespanData,
          fill: false,
          borderColor: '#3cb44b'
        },
        {
          label: 'Number of Setups',
          data: setupData,
          fill: false,
          borderColor: '#ffe119'
        },
        {
          label: 'Setup Time',
          data: setupTime,
          fill: false,
          borderColor: '#4363d8'
        }
      ]
    };
  }
}
