import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [ ]
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  logged():boolean {
    if (localStorage.getItem('currentUser')) {
        // logged in so return true
        return true;
    }
    return false;
  }

}
