import { Component, OnInit, Input } from '@angular/core';
import { SchedulerService } from '../schedulerService';
import * as socketIo from 'socket.io-client';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDiagramComponent } from '../modal-diagram/modal-diagram.component';

@Component({
  selector: 'app-job-editor',
  templateUrl: './job-editor.component.html',
  styleUrls: ['./job-editor.component.css'],
  providers: [SchedulerService]
})
export class JobEditorComponent implements OnInit {
  targetJobs = [];

  makespan = 90;
  setupTime = 50;
  setups = 30;

  population = 50;
  iteration = 200;
  description = 'Test run ' + ' ' + Math.round(Math.random() * 1000);
  availableJobs;
  socket;
  simulationLog = [];
  data;
  result;

  // diagram data
  setupTimeData = [];
  makespanData = [];
  setupData = [];
  index = [];
  options;
  modalRef;

  constructor(private schedulerService: SchedulerService, private modalService: NgbModal) { }

  async ngOnInit() {
    this.availableJobs = await this.schedulerService.getAllJobs();
    this.socket = socketIo({ 'path': '/socketio' });
    this.socket.on('progress', (data) => {
      this.index.push(data.i + 1);
      this.makespanData.push(data.makespan);
      this.setupData.push(data.numberOfSetups);
      this.setupTimeData.push(data.setupTime);
      if ((data.i + 1) % 10 === 0) {
        this.createDiagram();
      }
    });
    this.socket.on('result', (data) => {
      this.result = data['resultLog'];
      this.simulationLog = data['simulationLog'];
    });
  }

  reschedule() {
    this.modalRef = this.modalService.open(ModalDiagramComponent, { size: 'lg' });

    this.simulationLog = [];
    this.setupTimeData = [];
    this.makespanData = [];
    this.setupData = [];
    this.index = [];
    this.createDiagram();
    this.schedulerService.optimize(this.targetJobs,
      [this.makespan / 100, this.setups / 100, this.setupTime / 100], this.iteration, this.population);
  }

  async save() {
    const bestResult = this.simulationLog.pop();
    delete bestResult.i;
    delete bestResult.fittness;
    // save scheduling
    await this.schedulerService.saveScheduling({
      description: this.description,
      date: '' + new Date(), log: JSON.stringify([this.result]), result: JSON.stringify(bestResult)
    });
  }

  createDiagram() {
    if (this.modalRef === undefined) {
      return;
    }
    this.modalRef.componentInstance.data = {
      labels: this.index,
      datasets: [
        {
          label: 'Makespan',
          data: [...this.makespanData],
          fill: false,
          borderColor: '#3cb44b',
          hidden: false
        },
        {
          label: 'Number of Setups',
          data: [...this.setupData],
          fill: false,
          borderColor: '#ffe119',
          hidden: false
        },
        {
          label: 'Setup Time',
          data: [...this.setupTimeData],
          fill: false,
          borderColor: '#4363d8',
          hidden: false
        }
      ]
    };

    this.modalRef.componentInstance.options = {
      animation: {
        duration: 0, // general animation time
      },
      hover: {
        animationDuration: 0, // duration of animations when hovering an item
      },
      responsiveAnimationDuration: 0, // animation duration after a resize
    };
  }
}
