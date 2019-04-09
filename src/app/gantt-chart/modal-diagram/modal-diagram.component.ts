import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-diagram',
  templateUrl: './modal-diagram.component.html',
  styleUrls: ['./modal-diagram.component.css']
})
export class ModalDiagramComponent implements OnInit {
  data;
  options;
  @ViewChild('chart')
  chart;
  isShowMakespan = true;
  isShowSetuptime = true;
  isShowSetups = true;

  constructor(public activeModal: NgbActiveModal) { }

  close() {
    this.activeModal.close();
  }

  ngOnInit() {
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
