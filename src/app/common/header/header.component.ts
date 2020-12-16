import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LoginAs } from '../../enums/login.enum'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

@Injectable()
export class HeaderComponent implements OnInit {
  @Input() loginAs: number = 0;
  @Output() changeUI = new EventEmitter<string>();

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

  onClick() {
    if (this.loginAs == LoginAs.GUESS) this.router.navigate(['/login']);
    else this.logout();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  navigateToAdminPage() {
    this.router.navigate(['/admin']);
    this.changeUI.emit('admin');
  }
}

