import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inputPipe'
})
export class InputPipePipe implements PipeTransform {

  transform(comics: any[], filter: string): any[] {
    if (!comics || !filter.trim()) return [];
    return comics.filter(comic => comic.title.toLowerCase().includes(filter.toLowerCase()));
  }

}
