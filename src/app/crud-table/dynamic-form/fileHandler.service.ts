import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Injectable({
    providedIn: 'root'
  })
  export class FileHandlerService {
    form: FormGroup;

    public onFileChange(event, form: FormGroup): void {
        this.form = form;
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.form.value['fileData'] = e.currentTarget['result'];
          };
          reader.readAsDataURL(fileList[0]);
        }
      }
  }
