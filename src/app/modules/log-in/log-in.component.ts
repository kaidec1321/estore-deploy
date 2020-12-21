import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { GlobalService } from 'src/app/_services/global.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private globalService: GlobalService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      admin: [false]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    
    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value, this.f.admin.value)
      .pipe(first())
      .subscribe({
        next: () => {
          
          // get return url from route parameters or default to '/'
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.globalService.getGlobalInfo();
          this.router.navigate([returnUrl]);
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }

}
