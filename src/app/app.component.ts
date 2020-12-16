import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../app/_models/user'
import { AuthenticationService } from './_services/authentication.service';
declare let AOS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAdminUI: boolean = false;
  currentUser: User;
  title = 'bookshop';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      console.log(x)});
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    AOS.init();
  }

  handleChangeUI(e) {
    if (e == 'admin') {
      this.router.navigate(['/admin']);
      this.isAdminUI = true;
    }
    else {
      this.router.navigate(['/home']);
      this.isAdminUI = false;
    }
  }
}
