import {Component, OnInit} from '@angular/core';
import {RestApiService} from '../shared/rest-api.service';
import {Profile} from '../shared/profile';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  profileData: Profile;

  constructor(private restApiService: RestApiService, private router: Router) {
  }

  // get profile data
  ngOnInit(): void {
    this.restApiService.getProfileData().subscribe((res: Profile) => {
      this.profileData = res;
    }, ((error: HttpErrorResponse) => {
      // TODO: add error handler
    }));
  }

  // logout to login page and delete the token
  logOut(): void {
    sessionStorage.removeItem('access_token');
    this.router.navigate(['login']).then();
  }

}

