import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import * as dagreD3 from 'dagre-d3';

@Component({
  selector: 'app-typeorm-erd',
  templateUrl: './typeorm-erd.component.html',
  styleUrls: ['./typeorm-erd.component.css']
})
export class TypeormERDComponent implements OnInit {
  @Input() entities: any[];
  g = new dagreD3.graphlib.Graph();
  render = new dagreD3.render();
  svg;
  inner;
  zoom;
  gNodes;

  transform = {
    translateX: 0,
    translateY: 0,
    scale: 1
  };

  constructor() { }

  ngOnInit() {
    d3.select('svg').remove();
    this.svg = d3.select('.typeorm-svg-wrapper').append('svg').attr('width', '100%').attr('height', '600');
    this.inner = this.svg.append('g');

    this.g.setGraph({
      nodesep: 70,
      ranksep: 50,
      rankdir: 'LR',
      marginx: 20,
      marginy: 20
    });
    this.g.setDefaultEdgeLabel(function () { return {}; });
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
    this.updateChart(this.entities);
  }

  createNodeObject(node) {
    let html;

    html = `<div class="node">
        <div class="name">` + node.name + `</div>`;

    for (const entity of node.entity) {
      html += '<div class="field">' + `${entity.key}:${entity.type} &lt;${entity.controlType}&gt;` + '</div>';
    }

    html += '</div>';

    return {
      labelType: 'html',
      label: html,
      rx: 5,
      ry: 5,
      padding: 5,
      class: ''
    };
  }

  capitalizeFirstLetterTrimLast(str) {
    return str[0].toUpperCase() + str.slice(1, str.length - 1);
  }

  updateChart(nodes) {
    let node;

    for (let i = 0, x = nodes.length; i < x; ++i) {
      node = nodes[i];
      this.g.setNode(node.name, this.createNodeObject(node));
    }

    for (let i = 0, x = nodes.length; i < x; ++i) {
      node = nodes[i];
      for (const e of node.entity) {
        if (e.linkedObject !== null) {
          this.g.setEdge(this.capitalizeFirstLetterTrimLast(e.linkedObject), node.name, {label: '* : 1'});
        }
      }
    }

    this.renderGraph(true);
  }

  renderGraph(centerEnabled) {
    this.inner.call(this.render, this.g);

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
    const graphWidth = this.g.graph().width + 80;
    const graphHeight = this.g.graph().height + 40;
    const width = parseInt(this.svg.style('width').replace(/px/, ''), 10);
    const height = parseInt(this.svg.style('height').replace(/px/, ''), 10);
    const zoomScale = Math.min(width / graphWidth, height / graphHeight);
    const translateX = (width / 2) - ((graphWidth * zoomScale) / 2);
    const translateY = (height / 2) - ((graphHeight * zoomScale) / 2);
    const svgZoom = this.svg.transition().duration(0);
    svgZoom.call(this.zoom.transform, d3.zoomIdentity.translate(translateX, translateY).scale(zoomScale));
    this.transform.translateX = translateX;
    this.transform.translateY = translateY;
    this.transform.scale = zoomScale;
  }
}
