import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  constructor(private router: Router, private _userService: UserService) { }

  protected logIn() {
    this._userService.generateUsername();
    this.router.navigate(['chatroom']);
  }
}
