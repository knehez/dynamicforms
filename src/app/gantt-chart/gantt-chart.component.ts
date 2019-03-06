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

  entities = [];

  transform = {
    translateX: 0,
    translateY: 0,
    scale: 1
  };

  constructor() { }

  ngOnInit() {
    this.entities = [{
      "machines": ["Machine 1", "Machine 2", "Machine 3"], makespan: 300, jobs: [{ name: 'Job 1' }, { name: 'Job 2' }, { name: 'Job 3' }],
      log: [{ "machine": "Machine 1", "event": "s", "job": 'Job 1', 'startTime': 0, 'endTime': 30 },
      { "machine": "Machine 2", "event": "w", "job": 'Job 1', 'startTime': 0, 'endTime': 10 },
      { "machine": "Machine 3", "event": "w", "job": 'Job 1', 'startTime': 0, 'endTime': 30 },
      { "machine": "Machine 2", "event": "w", "job": 'Job 1', 'startTime': 15, 'endTime': 20 }
      ]
    }];

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
      lastHeight = this.showGanttChart(this.entities[i], this.inner.append('g').attr('transform', 'translate(0,' + (lastHeight * i) + ')'));
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
    this.renderGraph(true);
  }

  showGanttChart(entity, d3Elem, type = 'MACHINE_ORIENTED') {
    const margin = { top: 20, right: 20, bottom: 20, left: 20 },
      width = entity.makespan - margin.left - margin.right;

    const jobs = entity.jobs.map((j) => j.name);

    let ganttHeight;

    if (type == 'MACHINE_ORIENTED') {
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

    const yAxis = d3.scaleBand()
      .domain(entity.machines) // input
      .range([0, height]);

    const y = d3.scaleOrdinal()
      .domain(entity.machines) // input
      .range([0, height]); // output

    d3Elem.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x).tickSize(-height));

    d3Elem.append('g')
      .attr('class', 'y axis')
      .call(d3.axisLeft(yAxis).tickSize(-width)); // Create an axis component with d3.axisLeft

    const chart = d3Elem.selectAll().data(entity.log).enter();

    const div = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    const toolTip = d => {
      div
        .transition()
        .duration(200)
        .style('opacity', 0.9);
      div
        .html(d.job + '<br>' + 'start:' + d.startTime + '<br>' + 'end:' + d.endTime)
        .style('left', d3.event.pageX + 'px')
        .style('top', d3.event.pageY - 50 + 'px');
    };

    const hideToolTip = () => {
      div
        .transition()
        .duration(500)
        .style('opacity', 0);
    };

    chart
      .append('rect')
      .attr('x', (data, i) => x(data.startTime))
      .attr('class', (data, i) => 'J' + data.job)
      .attr('rx', '2')
      .attr('ry', '2')
      .attr('y', (data, i) => yAxis(data.machine) + yAxis(entity.machines[1]) * 0.1)
      .attr('width', (data, i) => x(data.endTime - data.startTime))
      .attr('height', yAxis(entity.machines[1]) * 0.8)
      .style('fill', function (d, i) {
        if (d.event === 's') {
          return 'url(#dashedBackground)';
        }
        return d3.schemeCategory10[jobs.indexOf(d.job) % 10];
      })
      .on('mouseover', toolTip)
      .on('mouseout', hideToolTip)
      .on('click', (d) => {
        const otherSelectedJobs = d3.selectAll('rect:not([class^="J' + d.job + '"])');
        if (otherSelectedJobs.classed('selectJob')) {
          otherSelectedJobs.classed('selectJob', false);
        } else {
          otherSelectedJobs.classed('selectJob', true);
        }
      });

    chart.append('text')
      .attr('x', (data, i) => x(data.startTime))
      .attr('dy', (data, i) => yAxis(entity.machines[1]) * 0.6)
      .attr('dx', (data, i) => 3)
      .attr('y', (data, i) => yAxis(data.machine))
      .attr('font-size', '6px')
      .attr('fill', 'white')
      .text(function (d) {
        if (d.event === 's') {
          return '';
        } else if (x(d.endTime - d.startTime) > 66) {
          return d.job;
        }
      })
      .on('mouseover', toolTip)
      .on('mouseout', hideToolTip);

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
    const translateX = (width / 2) - ((graphWidth * zoomScale) / 2);
    const translateY = (height / 2) - ((graphHeight * zoomScale) / 2) + 30;
    const svgZoom = this.svg.transition().duration(1000);
    svgZoom.call(this.zoom.transform, d3.zoomIdentity.translate(translateX, translateY).scale(zoomScale));
    this.transform.translateX = translateX;
    this.transform.translateY = translateY;
    this.transform.scale = zoomScale;
  }
}
