import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartdataService {

  private data = new Subject<object>()

  constructor() { }

  public getData(): Observable<object> {
    return this.data.asObservable();
  }

  public updateData(_data: object): void {
    this.data.next(_data);
  }
}
