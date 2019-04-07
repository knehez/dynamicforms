import { InputBase } from './inputBase';

export class FileInput extends InputBase<string> {
  controlType = 'file';

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}

