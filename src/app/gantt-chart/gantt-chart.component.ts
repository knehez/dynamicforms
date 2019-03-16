import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.css']
})
export class GanttChartComponent implements OnInit {
  svg;
  inner;
  zoom;

  @Input()
  entities = [];

  transform = {
    translateX: 0,
    translateY: 0,
    scale: 1
  };

  showTooltip = false;
  time = 0;
  isSelectTime;

  zoomAndAnimate = true;
  ganttType: 'MACHINE_ORIENTED' | 'JOB_ORIENTED' = 'MACHINE_ORIENTED';

  constructor() { }

  ngOnInit() {
    d3.select('svg').remove();
    this.svg = d3.select('.gantt-svg-wrapper').append('svg').attr('width', '100%').attr('height', '600');
    const defs = this.svg.append('defs').append('pattern').attr('id', 'dashedBackground')
      .attr('width', '4').attr('height', '4').attr('patternUnits', 'userSpaceOnUse');

    defs.append('line').attr('stroke', 'rgb(146, 146, 146)').attr('stroke-width', '0.2')
      .attr('x2', '4').attr('y2', '4').attr('x1', '0').attr('y1', '0');

    defs.append('line').attr('stroke', 'rgb(146, 146, 146)').attr('stroke-width', '0.2')
      .attr('x2', '4').attr('y2', '0').attr('x1', '0').attr('y1', '4');

    this.inner = this.svg.append('g');

    let lastHeight = 0;

    for (let i = 0; i < this.entities.length; i++) {
      lastHeight = this.showGanttChart(this.entities[i], this.inner.append('g').
        attr('transform', 'translate(0,' + (lastHeight * (i)) + ')'), this.ganttType);
    }

    this.zoom = d3.zoom().on('zoom', () => {
      this.inner.attr('transform', d3.event.transform);
      if (d3.event.sourceEvent !== undefined) {
        if (d3.event.sourceEvent instanceof WheelEvent) {
          this.transform.translateX = d3.event.transform.x;
          this.transform.translateY = d3.event.transform.y;
          this.transform.scale = d3.event.transform.k;
        }
        if (d3.event.sourceEvent instanceof MouseEvent) {
          this.transform.translateX = d3.event.transform.x;
          this.transform.translateY = d3.event.transform.y;
        }
      }
    });

    this.svg.call(this.zoom);
    this.renderGraph(this.zoomAndAnimate);
  }

  gantTypeChanged(type) {
    this.ganttType = type;
    this.zoomAndAnimate = false;
    this.ngOnInit();
  }

  showGanttChart(entity, d3Elem, type = 'MACHINE_ORIENTED') {
    const margin = { top: 20, right: 20, bottom: 20, left: 20 },
      width = entity.makespan - margin.left - margin.right;

    const jobs = entity.jobs.map((j) => j.name);

    let ganttHeight;

    if (type === 'MACHINE_ORIENTED') {
      ganttHeight = entity.machines.length;
    } else {
      ganttHeight = jobs.length;
    }

    const height = (ganttHeight * 20) - margin.top - margin.bottom;

    const parseDate = d3.timeParse('%Y-%m-%d'),
      formatDate = d3.timeFormat('%b %d');

    const x = d3.scaleLinear()
      .domain([0, entity.makespan]) // input
      .range([0, width]);

    entity.jobNames = entity.jobs.map((j) => j.name);

    const yAxis = d3.scaleBand()
      .domain(type === 'MACHINE_ORIENTED' ? entity.machines : entity.jobNames) // input
      .range([0, height]);

    const y = d3.scaleOrdinal()
      .domain(type === 'MACHINE_ORIENTED' ? entity.machines : entity.jobNames) // input
      .range([0, height]); // output

    d3Elem.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x).tickSize(-height));

    const utilization = new Map<string, number>();

    if (type === 'MACHINE_ORIENTED') {
      for (const u of entity.utilization) {
        utilization.set(u[0], u[1]);
      }

      d3Elem.append('g')
        .attr('class', 'y axis')
        .call(d3.axisLeft(yAxis).tickSize(-width)
          .tickFormat(
            (d) => d + ' (' + utilization.get(d) + '%)')
        );
    } else {
      d3Elem.append('g')
        .attr('class', 'y axis')
        .call(d3.axisLeft(yAxis).tickSize(-width));
    }

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
        .html(d.job + '<br>' + '[ ' + d.startTime + ' - ' + d.endTime + ' ] <br>' + d.machine)
        .style('left', d3.event.pageX + 'px')
        .style('top', d3.event.pageY - 50 + 'px');
    };

    const moveTimeline = () => {
      if (!this.isSelectTime) {
        return;
      }
      timeLine.style('display', null);
      const mouseX = d3.mouse(d3.event.target)[0];
      this.time = Math.round(x.invert(mouseX) + 0.5);
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

    // draw operations
    chart.filter(function (d) {
      if (d.event === 's' || d.event === 'w') {
        return true;
      }
    })
      .append('rect')
      .attr('x', (data) => x(data.startTime))
      .attr('class', (data) => 'J' + data.job)
      .attr('rx', '2')
      .attr('ry', '2')
      .attr('y', dataYPos)
      .attr('width', (data) => x(data.endTime - data.startTime))
      .attr('height', dataYHeight)
      .style('fill', function (d) {
        if (d.event === 's') {
          return 'url(#dashedBackground)';
        }
        if (d.event === 'w') {
          return d3.schemeCategory10[jobs.indexOf(d.job) % 10];
        }
      })
      .on('mouseover', operationToolTip)
      .on('mouseout', hideOperationToolTip)
      .on('click', (d) => {
        if (this.isSelectTime) {
          this.isSelectTime = false;
          return;
        }
        const otherSelectedJobs = d3.selectAll('rect:not([class^="J' + d.job + '"])');
        if (otherSelectedJobs.classed('selectJob')) {
          otherSelectedJobs.classed('selectJob', false);
        } else {
          otherSelectedJobs.classed('selectJob', true);
        }
      }).on('mousemove', moveTimeline);

    const textDyPos = () => {
      if (type === 'MACHINE_ORIENTED') {
        return yAxis(entity.machines[1]) * 0.6;
      } else {
        return yAxis(entity.jobNames[1]) * 0.6;
      }
    };

    const textYPos = (data) => {
      if (type === 'MACHINE_ORIENTED') {
        return yAxis(data.machine);
      } else {
        return yAxis(data.job);
      }
    };

    // draw operation text
    chart.append('text').filter(function (d) {
      if (d.event === 's' || d.event === 'w') {
        return true;
      }
    })
      .attr('x', (data, i) => x(data.startTime))
      .attr('dy', textDyPos)
      .attr('dx', 3)
      .attr('y', textYPos)
      .attr('font-size', '6px')
      .attr('fill', 'white')
      .text(function (d) {
        if (d.event === 's') {
          return '';
        } else if (x(d.endTime - d.startTime) > 66) {
          return type === 'MACHINE_ORIENTED' ? d.job : d.machine;
        }
      })
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
      .attr('x', (data) => x(data.startTime))
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

    return height + margin.bottom;
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

  zoomAndScaleGraph() {
    // Zoom and scale to fit
    const graphWidth = 200;
    const graphHeight = 200;
    const width = parseInt(this.svg.style('width').replace(/px/, ''), 10);
    const height = parseInt(this.svg.style('height').replace(/px/, ''), 10);
    const zoomScale = Math.min(width / graphWidth, height / graphHeight);
    const translateX = (width / 2) - ((graphWidth * zoomScale) / 2) + 100;
    const translateY = (height / 2) - ((graphHeight * zoomScale) / 2) + 40;
    const svgZoom = this.svg.transition().duration(1000);
    svgZoom.call(this.zoom.transform, d3.zoomIdentity.translate(translateX, translateY).scale(zoomScale));
    this.transform.translateX = translateX;
    this.transform.translateY = translateY;
    this.transform.scale = zoomScale;
  }
}
