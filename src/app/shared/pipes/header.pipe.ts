import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'header',
  standalone: true
})
export class HeaderPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {

    if(args[0] === "hd") {
      return value + "K"
    }
    
    if(args[0] === "item") {
      return value[0].toUpperCase() + value.substr(1).toLowerCase()
    }

    return value;
  }

}
