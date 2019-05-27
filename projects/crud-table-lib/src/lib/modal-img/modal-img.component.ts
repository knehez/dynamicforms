import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from 'file-saver';



@Component({
  selector: 'lib-modal-img',
  templateUrl: './modal-img.component.html',
  styleUrls: ['./modal-img.component.css']
})
export class ModalImgComponent implements OnInit {
  @Input() imgDataB64: string;

  constructor(public activeModal: NgbActiveModal) { }

  name: string;
  type: string;
  extension: string;

  ngOnInit() {
    if (this.imgDataB64 !== null && this.imgDataB64 !== undefined && this.imgDataB64 !== '') {
      this.name = this.imgDataB64['name'];
      this.type = this.resSplitter(this.imgDataB64['data'], 0);
      this.extension = this.resSplitter(this.imgDataB64['data'], 1);
    }
  }

  close() {
    this.activeModal.close();
  }

  openFile() {
    const pdfWindow = window.open('');
    pdfWindow.document.write('<iframe width="100%" height="100%" src="' + this.imgDataB64['data'] + '"></iframe>');
  }

  base64MimeType(encoded) {
    let result = null;
    if (encoded === '' || encoded === undefined) {
      return result;
    }
    if (typeof encoded !== 'string') {
      return result;
    }
    const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    if (mime && mime.length) {
      result = mime[1];
    }
    return result;
  }

  resSplitter(encoded, retVal) {
    return this.base64MimeType(encoded).split('/')[retVal];
  }

  download() {
    const fileName = this.name;
    fetch(this.imgDataB64['data'])
      .then(res => res.blob())
      .then(blob => saveAs.saveAs(blob, `${fileName}`)
      );
  }
}
