import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service'

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styles: []
})
export class ExploreComponent implements OnInit {

  constructor(private userService:UsersService) { }

  ngOnInit() {
  }

}
