import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from 'file-saver';



@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styleUrls: ['./modal-img.component.css']
})
export class ModalImgComponent implements OnInit {
  @Input() imgDataB64: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  close() {
    this.activeModal.close();
  }

  base64MimeType(encoded) {
    let result = null;
    if (typeof encoded !== 'string') {
      return result;
    }
    const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    if (mime && mime.length) {
      result = mime[1];
    }
    return result;
  }

  download() {
    const fileName = 'fileX';
    const mimeType = this.base64MimeType(this.imgDataB64);
    const extension = mimeType.split('/')[1];
    fetch(this.imgDataB64)
      .then(res => res.blob())
      .then(blob => saveAs.saveAs(blob, `${fileName}.${extension}`)
      );
  }
}
