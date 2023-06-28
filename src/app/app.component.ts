import { Component, OnInit } from '@angular/core';
import { Firebase } from '@awesome-cordova-plugins/firebase/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private firebase: Firebase) {}
  ngOnInit(): void {
    try {
      this.firebase
        .getToken()
        .then((token) => {
          alert(token);
          console.log(`The token is ${token}`);
        }) // save the token server-side and use it to push notifications to this device
        .catch((error) => { alert(error);console.error('Error getting token', error)});
  
      this.firebase
        .onNotificationOpen()
        .subscribe((data) => {alert(data);console.log(`User opened a notification ${data}`)});
  
      this.firebase
        .onTokenRefresh()
        .subscribe((token: string) => {alert(token);console.log(`Got a new token ${token}`)});
      } catch (error) {
        alert('exception')
      }
    }
}
