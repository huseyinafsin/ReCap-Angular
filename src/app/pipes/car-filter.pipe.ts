import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/carDetail';

@Pipe({
  name: 'carFilter'
})
export class CarFilterPipe implements PipeTransform {

  transform(value: CarDetail[], filterText: string): CarDetail[] {
    filterText = filterText ? filterText.toLowerCase():""
    return filterText?value.filter((c:CarDetail) => c.carName.toLowerCase().indexOf(filterText)!== -1):value
  }

}
