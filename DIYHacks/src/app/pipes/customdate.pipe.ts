import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customdate'
})
export class CustomdatePipe implements PipeTransform {

  transform(date:string): any {
    let fecha = new Date(date)
    let ahora = new Date();

    let postDate = `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()}`;
    let today = `${ahora.getDate()}/${ahora.getMonth()}/${ahora.getFullYear()}`

    let datediff = Math.round((ahora.getTime() - fecha.getTime())/(1000*60*60*24));

    if(datediff == 0)
      return `${fecha.getHours()}:${fecha.getMinutes()}`;
    else
      return `hace ${datediff} día${datediff > 1 ? 's' : ''}`;
  }


}
