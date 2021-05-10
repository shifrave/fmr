import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RestApiService} from '../shared/rest-api.service';
import {Router} from '@angular/router';
import {Token} from '../shared/token';
import {HttpErrorResponse} from '@angular/common/http';

export const unauthorizedStatusCode = 401;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isSubmitted: boolean;

  constructor(private fb: FormBuilder, private restApiService: RestApiService,
              private router: Router) {
  }

  // init form
  ngOnInit(): void {
    this.form = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+')]),
      password: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z1-9]+')])
    });
  }

  // submit form
  onSubmit(): void {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.restApiService.identification(this.form.value).subscribe((res: Token) => {
        sessionStorage.setItem('access_token', res.access_token);
        this.router.navigate(['homepage']).then();
      }, ((error: HttpErrorResponse) => {
        if (error.status === unauthorizedStatusCode) {
          alert('invalid username or password!');
          this.form.reset();
          this.isSubmitted = false;
        }
      }));
    }
  }

}
