import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-diagram',
  templateUrl: './modal-diagram.component.html',
  styleUrls: ['./modal-diagram.component.css']
})
export class ModalDiagramComponent implements OnInit {
  data;
  options;

  constructor(public activeModal: NgbActiveModal) { }

  close() {
    this.activeModal.close();
  }

  ngOnInit() {
  }

}
