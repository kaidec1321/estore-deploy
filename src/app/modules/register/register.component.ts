import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { GlobalService } from 'src/app/_services/global.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup;
  error: string;
  submitted: boolean = false;
  

  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private globalService: GlobalService,
    private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstname: [''],
      lastname: [''],
      phone: ['', Validators.required]
    });
  }

  get f() { return this.signUpForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }

    // let user = new UserInfo();
    // user.email = this.f.email.value;
    // user.password = this.f.password.value;
    // user.phone = this.f.phone.value;
    // user.fullname = this.f.firstname.value + ' ' + this.f.lastname.value;
    this.authenticationService.signup(this.f.email.value, this.f.password.value, this.f.phone.value, this.f.firstname.value + ' ' + this.f.lastname.value).subscribe(data => {
      this.router.navigate(['/login']);
    },
    error => {
      this.error = error;
    })

  }

}
