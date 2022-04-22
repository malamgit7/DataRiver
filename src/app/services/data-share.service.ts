import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  private data: any = {};

  constructor() { }

  setOption(option: any, value: any) {
    this.data[option] = value;
  }

  getOption() {
    return this.data;
  }
}
