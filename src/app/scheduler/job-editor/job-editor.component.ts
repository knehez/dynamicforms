import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SchedulerService } from '../schedulerService';
import * as socketIo from 'socket.io-client';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-job-editor',
  templateUrl: './job-editor.component.html',
  styleUrls: ['./job-editor.component.css'],
  providers: [SchedulerService]
})
export class JobEditorComponent implements OnInit {
  items: MenuItem[];

  activeIndex = 0;

  @Input() targetJobs = [];

  makespan = 90;
  setupTime = 50;
  setups = 30;
  lateJobs = 60;

  population = 30;
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
  lateJobsData = [];
  index = [];
  options;

  @ViewChild('chart')
  chart;
  isShowMakespan = true;
  isShowSetuptime = true;
  isShowSetups = true;
  isShowLateJobs = true;

  constructor(private schedulerService: SchedulerService, private modalService: NgbModal) { }

  async ngOnInit() {
    this.items = [{
      label: 'Edit jobs',
      command: (event: any) => {
        this.activeIndex = 0;
      }
    },
    {
      label: 'Set Priorities',
      command: (event: any) => {
        this.activeIndex = 1;
      }
    },
    {
      label: 'Optimization',
      command: (event: any) => {
        this.activeIndex = 2;
      }
    }
    ];

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

  schedule() {
    this.activeIndex = 2;
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
    this.data = {
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

    this.options = {
      animation: {
        duration: 0, // general animation time
      },
      hover: {
        animationDuration: 0, // duration of animations when hovering an item
      },
      responsiveAnimationDuration: 0, // animation duration after a resize
    };
  }

  showSetupTime(event) {
    this.data.datasets[2].hidden = !event;
    this.chart.chart.update();
  }

  showMakespan(event) {
    this.data.datasets[0].hidden = !event;
    this.chart.chart.update();
  }

  showSetups(event) {
    this.data.datasets[1].hidden = !event;
    this.chart.chart.update();
  }

}
