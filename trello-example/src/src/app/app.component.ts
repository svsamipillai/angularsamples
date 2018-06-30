import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  token: string = null;
  key = '352206beeb5228a44a7663d5304cb675';

  boards: Observable<any[]>;
  constructor(public http: HttpClient) {
    console.log('http is',http);
  }

  login() {
    if (window['Trello']) {
      console.log("Attempting to authorize");
      window['Trello'].authorize({
        type: 'popup',
        name: 'Getting Started Application',
        scope: {
          read: 'true',
          write: 'true'
        },
        expiration: 'never',
        success: () => {this.success()},
        error: () => {this.failure()},
      });
    } else {
      console.log('Trello does not exist.');
    }


  }
  success() {
    console.log("logged in");
    this.token = window['Trello'].token();
    const path = `https://api.trello.com/1/members/me/boards?key=${this.key}&token=${this.token}`;
    this.boards = this.http.get<any>(path);
  }
  failure() {
    console.log("Couldn't authenticate successfully.");
  }
}
