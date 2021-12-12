import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../models/color';

@Pipe({
  name: 'colorFilter'
})
export class ColorFilterPipe implements PipeTransform {

  transform(value: Color[], filteText:string): Color[] {
    filteText = filteText ? filteText.toLowerCase():""
    return filteText?value.filter((c:Color)=>c.name.toLowerCase().indexOf(filteText) !== -1):value
  }

}
