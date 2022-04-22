import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FieldToggleService {

  fieldTextType!: boolean;

  constructor() { }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
