import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../service/auth/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  roles: string[];
  isLogged: boolean;
  username: string;
  userId: string;

  constructor(
    private tokenStorage: TokenStorageService
  ) {
  }

  ngOnInit() {
    this.tokenStorage.rolesObservable.subscribe(r => {
      this.roles = r;
    });

    this.tokenStorage.isLoggedObservable.subscribe(l => {
      this.isLogged = l;
    });

    this.tokenStorage.usernameObservable.subscribe(u => {
      this.username = u;
    });

    this.tokenStorage.userIdObservable.subscribe(id => {
      this.userId = id;
    });

  }

  logout() {
    this.tokenStorage.signOut();
  }

}
