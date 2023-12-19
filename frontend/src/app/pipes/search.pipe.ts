import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/interfaces/users';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(allusers: User[], searchText: string):User[] {
    if (!allusers || searchText == '') {
      return allusers;
    }
    const filtered: User[] = [];
    for (let user of allusers) {
      if (user.Username.toLowerCase().includes(searchText.toLowerCase())) {
        filtered.push(user);
      }
    }
    return filtered;
  }
}
