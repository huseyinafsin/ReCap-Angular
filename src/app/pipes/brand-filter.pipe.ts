import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand';

@Pipe({
  name: 'brandFilter'
})
export class BrandFilterPipe implements PipeTransform {

  transform(value: Brand[], filterText: string): Brand[] {
    filterText.toLowerCase() ? filterText :""
    return filterText ? value.filter((b:Brand) =>b.name.toLowerCase().indexOf(filterText) !== -1):value
  }

}
