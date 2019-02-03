import { Pipe, PipeTransform } from '@angular/core';
// import { User } from '../models/user.model';

@Pipe({
  name: 'profilepic'
})
export class ProfilepicPipe implements PipeTransform {

  transform(value:any, pic:boolean = false): string {
    if(pic) {
      if (value && value == 'none')
        return 'assets/images.png'
      return value;
    }
    if(value && value.profilepic == 'none')
      return 'assets/images.png'
    else if (value)
      return value.profilepic;
  }

}
