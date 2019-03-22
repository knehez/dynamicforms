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
  @Input() entity;

  makespan = 20;
  setupTime = 50;
  setups = 10;

  population = 100;
  iteration = 50;
  description = 'Test run ' + ' ' + Math.round(Math.random() * 1000);
  availableJobs;

  constructor(private schedulerService: SchedulerService) { }

  async ngOnInit() {
    this.availableJobs = await this.schedulerService.getAllJobs();
        const socket = socketIo({ 'path': '/socketio' });
    socket.on('log', (data) => console.log(data));
  }

  async reschedule() {

    const result = await this.schedulerService.optimize(this.entity.jobs,
      [this.makespan / 100, this.setups / 100, this.setupTime / 100], this.iteration, this.population);

    // save scheduling
    await this.schedulerService.saveScheduling({
      description: this.description,
      date: '' + new Date(), log: JSON.stringify([result])
    });
  }
}
