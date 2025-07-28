import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(comics:any[],search:string ): any[] {
    if(!comics || !search) return comics
    return comics.filter(card=>{
      return card.title.toLowerCase().includes(search.toLocaleLowerCase())
    })
  }

}
