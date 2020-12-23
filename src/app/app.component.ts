import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../app/_models/user'
import { AuthenticationService } from './_services/authentication.service';
import { GlobalService } from './_services/global.service';
declare let AOS: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAdminUI: boolean = false;
  currentUser: User;
  title = 'bookshop';
  isLoading = true;
  subscription: Subscription;
  adminSubscription: Subscription;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private globalService: GlobalService
  ) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x; 
    });

    this.subscription = this.globalService.loadingAnnounce$.subscribe(state => {
      if (state) $('#preloader-active').fadeIn('slow');
      else $('#preloader-active').delay(450).fadeOut('slow');
    });

    this.adminSubscription = this.globalService.adminAnnounce$.subscribe(state => this.isAdminUI = state);
  }

  ngOnInit(): void {
    AOS.init();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
    this.adminSubscription.unsubscribe();
  }
}
