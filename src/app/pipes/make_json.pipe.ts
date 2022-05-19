import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'makeJson'
})
export class MakeJsonPipe implements PipeTransform {
    transform(data: string,) {
        return JSON.parse(data)
    }
}