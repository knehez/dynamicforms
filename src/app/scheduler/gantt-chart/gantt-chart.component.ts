import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { SchedulerService } from '../schedulerService';
import moment from 'moment';

@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.css'],
  providers: [SchedulerService]
})
export class GanttChartComponent implements OnInit {
  svg;
  inner;
  zoom;
  private isMousePanning = false;
  private dragAxis: 'horizontal' | 'vertical' | null = null;
  private readonly axisLockThreshold = 3;

  @Input()
  schedules = [];

  transform = {
    translateX: 0,
    translateY: 0,
    scale: 1
  };
  margin = { top: 50, right: 20, bottom: 50, left: 20 };

  showTooltip = false;
  currentTime;
  isSetCurrentTime;

  zoomAndAnimate = true;
  ganttType: 'MACHINE_ORIENTED' | 'JOB_ORIENTED' = 'MACHINE_ORIENTED';

  selectedJob;
  lastSelectedJob;

  fixYAxis = true;
  yAxisElement = [];

  constructor(private schedulerService: SchedulerService) { }

  ngOnInit() {
    this.lastSelectedJob = '';
    d3.select('svg').remove();
    this.svg = d3.select('.gantt-svg-wrapper').append('svg')
      .attr('width', '100%')
      .attr('height', '500');

    // Add background rectangle for click detection
    this.svg.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .style('fill', 'transparent')
      .style('pointer-events', 'all')
      .on('click', () => {
        // Clear selection when clicking on empty background
        if (this.lastSelectedJob) {
          this.clearSelection();
        }
      });

    const defs = this.svg.append('defs').append('pattern').attr('id', 'dashedBackground')
      .attr('width', '4').attr('height', '4').attr('patternUnits', 'userSpaceOnUse');

    defs.append('line').attr('stroke', 'rgb(146, 146, 146)').attr('stroke-width', '0.2')
      .attr('x2', '4').attr('y2', '4').attr('x1', '0').attr('y1', '0');

    defs.append('line').attr('stroke', 'rgb(146, 146, 146)').attr('stroke-width', '0.2')
      .attr('x2', '4').attr('y2', '0').attr('x1', '0').attr('y1', '4');

    this.inner = this.svg.append('g');

    let lastHeight = 0;
    this.yAxisElement = [];

    for (let i = 0; i < this.schedules.length; i++) {
      const schedule = this.schedules[i];
      lastHeight = this.showGanttChart(schedule.log, this.convertToMilliseconds(schedule.date), this.inner.append('g').
        attr('transform', 'translate(0,' + (lastHeight * (i)) + ')'), this.ganttType);
    }

    this.zoom = d3.zoom()
      .on('start', () => {
        const source = d3.event.sourceEvent;
        if (source instanceof MouseEvent && source.buttons === 1) {
          this.isMousePanning = true;
          this.dragAxis = null;
        } else {
          this.isMousePanning = false;
        }
      })
      .on('zoom', () => {
        const source = d3.event.sourceEvent;
        const eventTransform = d3.event.transform;
        let nextX = eventTransform.x;
        let nextY = eventTransform.y;
        const nextScale = eventTransform.k;

        if (!source) {
          this.isMousePanning = false;
          this.dragAxis = null;
        } else if (source instanceof WheelEvent) {
          this.isMousePanning = false;
          this.dragAxis = null;
        } else if (source instanceof MouseEvent && source.buttons === 1) {
          if (!this.dragAxis) {
            const deltaX = Math.abs(eventTransform.x - this.transform.translateX);
            const deltaY = Math.abs(eventTransform.y - this.transform.translateY);
            if (deltaX > this.axisLockThreshold || deltaY > this.axisLockThreshold) {
              this.dragAxis = deltaX >= deltaY ? 'horizontal' : 'vertical';
            }
          }
          if (this.dragAxis === 'horizontal') {
            nextY = this.transform.translateY;
          } else if (this.dragAxis === 'vertical') {
            nextX = this.transform.translateX;
          }
        } else {
          this.isMousePanning = false;
          this.dragAxis = null;
        }

        this.transform.translateX = nextX;
        this.transform.translateY = nextY;
        this.transform.scale = nextScale;

        const constrainedTransform = d3.zoomIdentity.translate(this.transform.translateX, this.transform.translateY)
          .scale(this.transform.scale);
        const svgNode = this.svg.node();
        if (svgNode) {
          svgNode.__zoom = constrainedTransform;
        }

        if (this.fixYAxis) {
          this.yAxisElement.map(o => o.attr('transform',
                                            'translate(' + (130 - this.transform.translateX / this.transform.scale) + ' , 0)'));
        } else {
          this.yAxisElement.map(o => o.attr('transform', 'translate(0, 0)'));
        }
        this.inner.attr('transform', constrainedTransform);
      })
      .on('end', () => {
        this.isMousePanning = false;
        this.dragAxis = null;
      });

    this.svg.call(this.zoom);
    this.renderGraph(this.zoomAndAnimate);
  }

  async reschedule() {
    for (const schedule of this.schedules) {
      const result = await this.schedulerService.reSchedule(schedule);
      schedule.log = result['resultLog'];
      schedule.result = result['simulationLog'].pop();
      delete schedule.result.i;
      delete schedule.result.fittness;
    }
    this.zoomAndAnimate = false;
    this.ngOnInit();
  }

  gantTypeChanged(type) {
    this.ganttType = type;
    this.zoomAndAnimate = false;
    this.ngOnInit();
  }

  jobSelected(event) {
    if (event.name !== this.lastSelectedJob) {
      this.selectJob({ job: event.name }, { jobs: event.jobs });
      const selectedJob = event.jobs.filter(job => job.name === event.name)[0];
      const xtrans = this.getXAxis(event, event.makespan);
      this.zoomAndScaleGraph(xtrans(-selectedJob.startTime * this.transform.scale), 0);
    }
  }

  selectJob = (d, entity) => {
    if (this.isSetCurrentTime) {
      this.isSetCurrentTime = false;
      return;
    }

    // reset selection
    const selectedJobs = d3.selectAll('rect:not([class="J' + d.job + '"])');
    selectedJobs.classed('unSelectedJob', false);

    if (d.job === this.lastSelectedJob) {
      this.lastSelectedJob = null;
      return;
    }

    this.lastSelectedJob = d.job;

    const unSelectedJobs = d3.selectAll('rect:not([class="J' + d.job + '"])');
    entity.selectedJob = entity.jobs.filter(j => j.name === d.job)[0];
    if (unSelectedJobs.classed('unSelectedJob')) {
      unSelectedJobs.classed('unSelectedJob', false);
    } else {
      unSelectedJobs.classed('unSelectedJob', true);
    }
  }

  clearSelection() {
    // Reset all job selections
    this.lastSelectedJob = null;

    // Remove gray overlay from all jobs
    const allJobs = d3.selectAll('rect[class*="J"]');
    allJobs.classed('unSelectedJob', false);

    // Clear selected job from all entities
    for (const schedule of this.schedules) {
      if (schedule.log.selectedJob) {
        schedule.log.selectedJob = null;
      }
    }
  }

  getXAxis(entity, width) {
    return d3.scaleLinear()
      .domain([0, entity.makespan]) // input
      .range([0, width]);
  }

  getXTimeAxis(entity, scheduleStart, width) {
    return d3.scaleTime()
      .domain([scheduleStart, scheduleStart + (entity.makespan * 1000 * 60)])
      .range([0, width]);
  }

  showGanttChart(entity, scheduleStart, d3Elem, type = 'MACHINE_ORIENTED') {
    const width = entity.makespan - this.margin.left - this.margin.right;
    const jobs = entity.jobs.map((j) => j.name);

    let ganttHeight;

    if (type === 'MACHINE_ORIENTED') {
      ganttHeight = entity.machines.length;
    } else {
      ganttHeight = jobs.length;
    }

    const height = (ganttHeight * 20) - this.margin.top - this.margin.bottom;

    const xAxis = this.getXTimeAxis(entity, scheduleStart, width);
    const xTimeAxis = this.getXTimeAxis(entity, scheduleStart, width);

    entity.jobNames = entity.jobs.map(j => j.name);

    const time = t => scheduleStart + (t * 60 * 1000);

    const yAxis = d3.scaleBand()
      .domain(type === 'MACHINE_ORIENTED' ? entity.machines : entity.jobNames) // input
      .range([0, height]);

    d3Elem.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xTimeAxis)
        .ticks(d3.timeHour)
        .tickFormat(d3.timeFormat('%H:%M')));

    d3Elem.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + (height + this.margin.bottom / 2) + ')')
      .call(d3.axisBottom(xTimeAxis)
        .ticks(d3.timeDay.every(0.5))
        .tickFormat(d3.timeFormat('%Y-%m-%d')));

    const timeLine = d3Elem.append('line')
      .attr('id', 'timeLineY')
      .attr('class', 'timeLine');

    const chart = d3Elem.selectAll().data(entity.log).enter();

    const div = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    const operationToolTip = d => {
      if (!this.showTooltip) {
        return;
      }
      div
        .transition()
        .duration(200)
        .style('opacity', 0.9);
      div
        .html(d.job + '<br>' + '[ ' + d.operationStart + ' - ' + d.operationEnd + ' ] <br>' + d.machine
          + '<br>' + this.getJob(entity, d.job).pieceType + '<br>Num of pieces: ' + this.getJob(entity, d.job).numOfPieces)
        .style('left', d3.event.pageX + 'px')
        .style('top', d3.event.pageY - 50 + 'px');
    };

    const moveTimeline = () => {
      if (!this.isSetCurrentTime) {
        return;
      }
      timeLine.style('display', null);
      const mouseX = d3.mouse(d3.event.target)[0];
      this.currentTime = moment(xAxis.invert(mouseX)).seconds(0).toDate().getTime();
      timeLine
        .attr('x1', mouseX).attr('y1', 0)
        .attr('x2', mouseX).attr('y2', height);
    };

    const hideOperationToolTip = () => {
      div
        .transition()
        .duration(1000)
        .style('opacity', 0);
    };

    const dataYPos = (data) => {
      if (type === 'MACHINE_ORIENTED') {
        return yAxis(data.machine) + yAxis(entity.machines[1]) * 0.1;
      } else {
        return yAxis(data.job) + yAxis(entity.jobNames[1]) * 0.1;
      }
    };

    const dataYHeight = () => {
      if (type === 'MACHINE_ORIENTED') {
        return yAxis(entity.machines[1]) * 0.8;
      } else {
        return yAxis(entity.jobNames[1]) * 0.8;
      }
    };

    // my own hash code generator
    const hashCode = (str) => {
      let hash = 0;
      if (str.length === 0) { return hash; }
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return Math.abs(hash);
    };

    const getCategoryColor = (jobName) => {
      return d3.schemeCategory10[hashCode(jobName) % 10];
    };

    // draw machine availability
    chart.filter(function (d) {
      if (d.event === 'machineNotAvailable') {
        return true;
      }
    })
      .append('rect')
      .attr('x', d => xAxis(time(d.start)))
      .attr('rx', '4')
      .attr('ry', '4')
      .attr('y', dataYPos)
      .attr('width', d => xAxis(time(d.end - d.start)))
      .attr('height', dataYHeight)
      .style('fill', 'rgba(220, 220, 220, 0.4)')
      .style('opacity', 0.2);

    // draw operations
    chart.filter(function (d) {
      if (d.event === 's' || d.event === 'w') {
        return true;
      }
    })
      .append('rect')
      .attr('x', d => xAxis(time(d.operationStart)))
      .attr('class', d => 'J' + d.job)
      .attr('rx', '2')
      .attr('ry', '2')
      .attr('y', dataYPos)
      .attr('width', d => xAxis(time(d.operationEnd - d.operationStart)))
      .attr('height', dataYHeight)
      .style('fill', function (d) {
        if (d.event === 's') {
          return 'url(#dashedBackground)';
        }
        if (d.event === 'w') {
          return getCategoryColor(d.job);
        }
      })
      .on('mouseover', operationToolTip)
      .on('mouseout', hideOperationToolTip)
      .on('click', (d) => {
        d3.event.stopPropagation(); // Prevent background click
        this.selectJob(d, entity);
      })
      .on('mousemove', moveTimeline);

    const textDyPos = () => {
      if (type === 'MACHINE_ORIENTED') {
        return yAxis(entity.machines[1]) * 0.6;
      } else {
        return yAxis(entity.jobNames[1]) * 0.6;
      }
    };

    const textYPos = d => {
      if (type === 'MACHINE_ORIENTED') {
        return yAxis(d.machine);
      } else {
        return yAxis(d.job);
      }
    };

    // draw operation text
    chart.append('text').filter(d => {
      if (d.event === 's' || d.event === 'w') {
        return true;
      }
    })
      .attr('x', d => xAxis(time(d.operationStart)))
      .attr('dy', textDyPos)
      .attr('dx', 3)
      .attr('y', textYPos)
      .attr('font-size', '6px')
      .attr('fill', 'white')
      .text(d => {
        const title = type === 'MACHINE_ORIENTED' ? d.job : d.machine;
        if (d.event === 's') {
          return '';
        } else if (xAxis(time(d.operationEnd - d.operationStart)) > title.length * 4) {
          return title;
        }
      })
      .on('click', d => this.selectJob(d, entity))
      .on('mouseover', operationToolTip)
      .on('mouseout', hideOperationToolTip)
      .on('mousemove', moveTimeline);

    // draw inventory text
    chart.append('text').filter(function (d) {
      if (type !== 'MACHINE_ORIENTED') {
        return false;
      }
      if (d.event === 'store') {
        return true;
      }
    })
      .attr('x', (data) => xAxis(time(data.operationStart)))
      .attr('dy', () => yAxis(entity.machines[1]) * 0.6)
      .attr('dx', () => -2)
      .attr('y', (data) => yAxis(data.machine))
      .attr('font-size', '6px')
      .attr('font-weight', 'bold')
      .attr('fill', 'black')
      .text((d) => d.numberOfItems)
      .on('mouseover', operationToolTip)
      .on('mouseout', hideOperationToolTip)
      .on('mousemove', moveTimeline);

    const utilization = new Map<string, number>();

    if (type === 'MACHINE_ORIENTED') {
      for (const u of entity.utilization) {
        utilization.set(u[0], u[1]);
      }

      this.yAxisElement.push(d3Elem.append('g')
        .attr('class', 'y axis')
        .call(d3.axisLeft(yAxis).tickSize(-width)
          .tickFormat(
            (d) => d + ' (' + utilization.get(d) + '%)')
        ));
    } else {
      this.yAxisElement.push(d3Elem.append('g')
        .attr('class', 'y axis')
        .call(d3.axisLeft(yAxis).tickSize(-width)));
    }

    return height + this.margin.bottom;
  }

  getJob(entity, jobName) {
    const job = entity.jobs.filter(j => j.name === jobName);
    return job[0];
  }

  renderGraph(centerEnabled) {
    if (centerEnabled) {
      this.zoomAndScaleGraph();
    } else {
      this.svg.transition()
        .duration(0)
        .call(this.zoom.transform, d3.zoomIdentity.translate(this.transform.translateX,
          this.transform.translateY).scale(this.transform.scale));
    }

  }

  zoomAndScaleGraph(xPosition = 0, yPosition = 0) {
    // Zoom and scale to fit
    const graphWidth = 600;
    const graphHeight = 400;
    const width = parseInt(this.svg.style('width').replace(/px/, ''), 10);
    const height = parseInt(this.svg.style('height').replace(/px/, ''), 10);
    const zoomScale = Math.min(width / graphWidth, height / graphHeight);
    const translateX = (width / 2) - ((graphWidth * zoomScale) / 2) + xPosition;
    const translateY = (height / 2) - ((graphHeight * zoomScale) / 2) + 20 + yPosition;
    const svgZoom = this.svg.transition().duration(1500);
    svgZoom.call(this.zoom.transform, d3.zoomIdentity.translate(translateX, translateY).scale(zoomScale));
    this.transform.translateX = translateX;
    this.transform.translateY = translateY;
    this.transform.scale = zoomScale;
  }

  convertToMilliseconds(date) {
    return moment(date).toDate().getTime();
  }

}
