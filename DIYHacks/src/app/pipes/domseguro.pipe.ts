import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

@Pipe({
  name: 'domseguro'
})
export class DomseguroPipe implements PipeTransform {

  constructor(private domSanitizer:DomSanitizer) {}

  transform(value:string): any {
    let url = value.replace("watch?v=", "embed/");
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
